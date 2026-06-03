import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

const FUNCTION_URL = 'https://xcngmshjuqoucdlgikao.supabase.co/functions/v1/public-booking'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id fehlt' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        error: 'Zahlung nicht abgeschlossen',
        payment_status: session.payment_status,
      }, { status: 400 })
    }

    const meta = session.metadata || {}

    // If this is a deferred booking, create it now
    if (meta.deferred_booking === 'true') {
      const bookRes = await fetch(`${FUNCTION_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: meta.bd_company_id,
          service_id: meta.bd_service_id || undefined,
          location_id: meta.bd_location_id || undefined,
          start_ts: meta.bd_start_ts,
          discount_code: meta.bd_discount_code || undefined,
          payment_method: 'stripe',
          payment_status: 'paid',
          bundle_id: meta.bd_bundle_id || undefined,
          bundle_price: meta.bd_bundle_price ? Number(meta.bd_bundle_price) : undefined,
          customer: {
            name: meta.bd_customer_name,
            email: meta.bd_customer_email,
            phone: meta.bd_customer_phone || undefined,
            notes: meta.bd_customer_notes || undefined,
          },
        }),
      })

      const bookData = await bookRes.json()

      if (bookData.error) {
        return NextResponse.json({
          error: bookData.error,
          payment_completed: true,
          refund_needed: true,
        }, { status: 400 })
      }

      return NextResponse.json({
        status: 'success',
        booking_id: bookData.booking_id,
        price: bookData.price,
        is_first_session: bookData.is_first_session,
        applied_discount: bookData.applied_discount,
        bundle_codes: bookData.bundle_codes,
        suggested_followup: bookData.suggested_followup,
        customer_email: meta.bd_customer_email,
        start_ts: meta.bd_start_ts,
        service_name: session.line_items?.data?.[0]?.description || meta.bd_service_id || '',
      })
    }

    // Legacy: booking was already created before Stripe
    return NextResponse.json({
      status: 'success',
      booking_id: meta.booking_id,
      payment_completed: true,
    })
  } catch (err: any) {
    console.error('Verify checkout error:', err)
    return NextResponse.json({ error: err.message || 'Überprüfung fehlgeschlagen' }, { status: 500 })
  }
}
