import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

const schema = z.object({
  produkt_slug: z.string().optional(),      // Für Produkte aus dem Katalog
  spende_betrag: z.number().min(1).optional(), // Für freie Spenden (in Euro)
  email: z.string().email().optional(),
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe nicht konfiguriert' }, { status: 500 })
    }

    const body = await request.json()
    const data = schema.parse(body)
    const origin = request.headers.get('origin') || 'https://backtobalance.online'
    const stripe = getStripe()

    // ── Freie Spende ──────────────────────────────────────────────
    if (data.spende_betrag) {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card', 'sepa_debit', 'paypal'],
        line_items: [{
          price_data: {
            currency: 'eur',
            unit_amount: data.spende_betrag * 100,
            product_data: {
              name: 'Spende an Back to Balance',
              description: `Spende über ${data.spende_betrag} € — Danke für deine Unterstützung!`,
            },
          },
          quantity: 1,
        }],
        customer_email: data.email || undefined,
        metadata: { typ: 'spende', betrag_eur: String(data.spende_betrag) },
        success_url: `${origin}/spenden?status=danke&betrag=${data.spende_betrag}`,
        cancel_url: `${origin}/spenden?status=abgebrochen`,
      })
      return NextResponse.json({ url: session.url })
    }

    // ── Produkt aus Katalog ───────────────────────────────────────
    if (!data.produkt_slug) {
      return NextResponse.json({ error: 'produkt_slug oder spende_betrag erforderlich' }, { status: 400 })
    }

    const supabase = getSupabase()
    const { data: produkt, error } = await supabase
      .from('produkt_katalog')
      .select('*')
      .eq('slug', data.produkt_slug)
      .eq('aktiv', true)
      .single()

    if (error || !produkt) {
      return NextResponse.json({ error: 'Produkt nicht gefunden' }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'sepa_debit', 'paypal'],
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: produkt.preis_extern,
          product_data: {
            name: produkt.name,
            description: produkt.beschreibung || undefined,
          },
        },
        quantity: 1,
      }],
      customer_email: data.email || undefined,
      metadata: {
        typ: produkt.kategorie,
        produkt_slug: produkt.slug,
        produkt_name: produkt.name,
      },
      success_url: `${origin}/koerperarbeit/preise?status=gebucht&produkt=${produkt.slug}`,
      cancel_url: `${origin}/koerperarbeit/preise?status=abgebrochen`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 })
    }
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Checkout fehlgeschlagen' }, { status: 500 })
  }
}
