import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name zu kurz'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  nachricht: z.string().min(10, 'Nachricht zu kurz'),
  telefon: z.string().optional(),
  betreff: z.string().optional(),
  typ: z.enum(['kontakt', 'mitmachen', 'gruendung', 'koerperarbeit']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      // Development fallback: log and return success
      console.log('Contact form submission (no Resend key):', data)
      return NextResponse.json({ success: true, dev: true })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(resendApiKey)

    const betreff = data.betreff || `Neue Nachricht von ${data.name}`
    const typLabel = data.typ ? ` [${data.typ}]` : ''

    const { error } = await resend.emails.send({
      from: 'BtB Website <noreply@backtobalance.online>',
      to: ['kontakt@backtobalance.online'],
      subject: `${betreff}${typLabel}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        ${data.telefon ? `<p><strong>Telefon:</strong> ${data.telefon}</p>` : ''}
        ${data.typ ? `<p><strong>Typ:</strong> ${data.typ}</p>` : ''}
        <hr />
        <p><strong>Nachricht:</strong></p>
        <p>${data.nachricht.replace(/\n/g, '<br/>')}</p>
      `,
      reply_to: data.email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ungültige Eingabe', details: err.errors }, { status: 400 })
    }
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
