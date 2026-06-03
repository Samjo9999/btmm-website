import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRODUKTE } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  produkt: z.enum(['erstsitzung', 'einzelsitzung', 'paket3']),
  name: z.string().optional(),
  email: z.string().email().optional(),
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe nicht konfiguriert' }, { status: 500 })
    }

    const body = await request.json()
    const { produkt, name, email } = schema.parse(body)

    const prod = PRODUKTE[produkt]
    const origin = request.headers.get('origin') || 'https://backtobalance.online'

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'sepa_debit', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: prod.preis,
            product_data: {
              name: prod.name,
              description: prod.description,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      metadata: {
        typ: 'koerperarbeit',
        produkt,
        name: name || '',
      },
      success_url: `${origin}/koerperarbeit/preise?status=gebucht&produkt=${produkt}`,
      cancel_url: `${origin}/koerperarbeit/preise?status=abgebrochen`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültiges Produkt' }, { status: 400 })
    }
    console.error('Stripe Checkout error:', err)
    return NextResponse.json({ error: 'Checkout fehlgeschlagen' }, { status: 500 })
  }
}
