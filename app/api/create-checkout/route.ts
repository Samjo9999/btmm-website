import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const {
    price, service_name, customer_email, customer_name,
    booking_id, logo_url, stripe_description,
    vat_enabled, vat_rate, netto_price, service_id,
    // New: booking details for deferred booking (Stripe only)
    booking_details,
  } = await req.json()

  try {
    const stripe = getStripe()
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://b-t-m-m.com'

    const baseDescription = stripe_description || 'Ganzheitliche Körperarbeit — individuell auf dich abgestimmt.'
    const vatNote = vat_enabled && vat_rate && netto_price
      ? `\n\nNetto: ${netto_price.toFixed(2).replace('.', ',')} EUR zzgl. ${vat_rate}% MwSt`
      : ''
    const fullDescription = baseDescription + vatNote

    // Build metadata — store booking details for deferred creation
    const metadata: Record<string, string> = {
      customer_name: customer_name || '',
    }
    if (booking_id) metadata.booking_id = String(booking_id)

    // Deferred booking: store all details needed to create the booking after payment
    if (booking_details) {
      metadata.deferred_booking = 'true'
      metadata.bd_company_id = booking_details.company_id || ''
      metadata.bd_service_id = booking_details.service_id || ''
      metadata.bd_start_ts = booking_details.start_ts || ''
      metadata.bd_customer_name = booking_details.customer_name || ''
      metadata.bd_customer_email = booking_details.customer_email || ''
      metadata.bd_customer_phone = booking_details.customer_phone || ''
      metadata.bd_customer_notes = booking_details.customer_notes || ''
      metadata.bd_discount_code = booking_details.discount_code || ''
      metadata.bd_bundle_id = booking_details.bundle_id || ''
      metadata.bd_bundle_price = booking_details.bundle_price ? String(booking_details.bundle_price) : ''
      metadata.bd_location_id = booking_details.location_id || ''
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Use {CHECKOUT_SESSION_ID} template for deferred booking
      success_url: booking_details
        ? `${origin}/koerperarbeit/bestaetigung?session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/koerperarbeit/bestaetigung?booking_id=${booking_id}`,
      cancel_url: `${origin}/koerperarbeit/buchen?step=payment${service_id ? `&service=${service_id}` : ''}`,
      customer_email: customer_email || undefined,
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: service_name || 'Körperarbeit Sitzung',
            description: fullDescription,
            ...(logo_url ? { images: [logo_url] } : {}),
          },
          unit_amount: Math.round((price || 0) * 100),
        },
        quantity: 1,
      }],
      payment_method_types: ['card', 'sepa_debit', 'paypal'],
      metadata,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe nicht konfiguriert' }, { status: 500 })
    }
    console.error('Create checkout error:', err)
    return NextResponse.json({ error: err.message || 'Checkout fehlgeschlagen' }, { status: 400 })
  }
}
