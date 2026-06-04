import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  betrag: z.number().min(1).max(10000), // in Euro
  name: z.string().optional(),
  email: z.string().email().optional(),
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe nicht konfiguriert' }, { status: 500 })
    }

    const body = await request.json()
    const { betrag, name, email } = schema.parse(body)

    const origin = request.headers.get('origin') || 'https://backtobalance.online'

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'sepa_debit', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: betrag * 100, // Cent
            product_data: {
              name: 'Spende an Back to Meaning Maximization',
              description: `Spende über ${betrag} € — Danke für deine Unterstützung!`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      metadata: {
        typ: 'spende',
        betrag_eur: String(betrag),
        name: name || '',
      },
      success_url: `${origin}/spenden?status=danke&betrag=${betrag}`,
      cancel_url: `${origin}/spenden?status=abgebrochen`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültiger Betrag' }, { status: 400 })
    }
    console.error('Stripe Checkout error:', err)
    return NextResponse.json({ error: 'Checkout fehlgeschlagen' }, { status: 500 })
  }
}
