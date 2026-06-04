import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

async function sendeBestaetigung(email: string, typ: string, betrag: number, details: Record<string, string>) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey || !email) return

  const { Resend } = await import('resend')
  const resend = new Resend(resendKey)

  const istSpende = typ === 'spende'

  const betreff = istSpende
    ? `Danke für deine Spende über ${betrag} € — Back to Meaning Maximization`
    : `Buchungsbestätigung: ${details.produkt_name || 'Körperarbeit'} — Back to Meaning Maximization`

  const html = istSpende
    ? `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1505;">
        <div style="text-align: center; padding: 2rem 0;">
          <img src="https://backtobalance.online/logo.png" alt="BtMM" width="80" style="margin-bottom: 1rem;" />
        </div>
        <h1 style="color: #8fa942; font-size: 1.6rem;">Danke für deine Spende!</h1>
        <p style="line-height: 1.8;">
          Deine Spende über <strong>${betrag} €</strong> ist bei uns eingegangen.
          Damit unterstützt du direkt den Aufbau einer gerechteren Wirtschaft.
        </p>
        <p style="line-height: 1.8;">
          Jeder Beitrag hilft uns, die technische Infrastruktur aufzubauen,
          die Genossenschaftsgründung voranzutreiben und die Gemeinschaft wachsen zu lassen.
        </p>
        <div style="background: #f0e9b6; border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0;">
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>Betrag:</strong> ${betrag} €<br/>
            <strong>Datum:</strong> ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}<br/>
            <strong>Zahlungs-ID:</strong> ${details.payment_id || '—'}
          </p>
        </div>
        <p style="line-height: 1.8;">
          <em>Hinweis: BtMM ist aktuell kein gemeinnütziger Verein — Spenden sind daher
          noch nicht steuerlich absetzbar.</em>
        </p>
        <p style="line-height: 1.8;">Herzliche Grüße,<br/><strong>Das Back to Meaning Maximization Team</strong></p>
        <hr style="border: none; height: 1px; background: #f0e9b6; margin: 2rem 0;" />
        <p style="font-size: 0.8rem; opacity: 0.5; text-align: center;">
          Back to Meaning Maximization · Freiburg · <a href="https://backtobalance.online" style="color: #2a7cab;">backtobalance.online</a>
        </p>
      </div>
    `
    : `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1505;">
        <div style="text-align: center; padding: 2rem 0;">
          <img src="https://backtobalance.online/logo.png" alt="BtMM" width="80" style="margin-bottom: 1rem;" />
        </div>
        <h1 style="color: #b61818; font-size: 1.6rem;">Buchungsbestätigung</h1>
        <p style="line-height: 1.8;">
          Deine Buchung für <strong>${details.produkt_name || 'Körperarbeit'}</strong> ist eingegangen.
          Wir freuen uns auf dich!
        </p>
        <div style="background: #f0e9b6; border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0;">
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>Leistung:</strong> ${details.produkt_name || 'Körperarbeit'}<br/>
            <strong>Betrag:</strong> ${betrag} €<br/>
            <strong>Datum:</strong> ${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}<br/>
            <strong>Zahlungs-ID:</strong> ${details.payment_id || '—'}
          </p>
        </div>
        <p style="line-height: 1.8;">
          Für die Terminvereinbarung melden wir uns in Kürze bei dir.
          Du kannst auch direkt einen Termin buchen:
        </p>
        <p>
          <a href="https://backtobalance.online/koerperarbeit/preise"
             style="display: inline-block; background: #2a7cab; color: white; padding: 0.6rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Termin vereinbaren
          </a>
        </p>
        <p style="line-height: 1.8; margin-top: 1.5rem;">Herzliche Grüße,<br/><strong>Samjo — Back to Meaning Maximization Körperarbeit</strong></p>
        <hr style="border: none; height: 1px; background: #f0e9b6; margin: 2rem 0;" />
        <p style="font-size: 0.8rem; opacity: 0.5; text-align: center;">
          Back to Meaning Maximization · Freiburg · <a href="https://backtobalance.online" style="color: #2a7cab;">backtobalance.online</a>
        </p>
      </div>
    `

  try {
    await resend.emails.send({
      from: 'Back to Meaning Maximization <noreply@backtobalance.online>',
      to: [email],
      subject: betreff,
      html,
    })
    console.log(`Bestätigungs-E-Mail gesendet an ${email}`)
  } catch (e) {
    console.error('E-Mail senden fehlgeschlagen:', e)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Kein Webhook-Secret konfiguriert' }, { status: 400 })
  }

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Ungültige Signatur' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const typ = session.metadata?.typ || ''
    const betrag = session.amount_total ? session.amount_total / 100 : 0
    const email = session.customer_email || ''
    const paymentId = typeof session.payment_intent === 'string' ? session.payment_intent : ''

    console.log(`Zahlung eingegangen: ${typ} — ${betrag}€`, {
      email,
      name: session.metadata?.name,
      produkt: session.metadata?.produkt_name,
    })

    // Spende in Supabase erfassen
    if (typ === 'spende') {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (supabaseUrl && supabaseKey) {
          await fetch(`${supabaseUrl}/rest/v1/donations`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
              'apikey': supabaseKey,
            },
            body: JSON.stringify({
              amount: betrag,
              donor_name: session.metadata?.name || null,
              donor_email: email || null,
              payment_id: paymentId,
              status: 'completed',
            }),
          })
        }
      } catch (e) {
        console.error('Supabase donation insert failed:', e)
      }
    }

    // Bestätigungs-E-Mail senden
    if (email) {
      await sendeBestaetigung(email, typ, betrag, {
        produkt_name: session.metadata?.produkt_name || '',
        payment_id: paymentId,
      })
    }
  }

  return NextResponse.json({ received: true })
}
