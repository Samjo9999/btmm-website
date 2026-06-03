import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const revalidate = 300 // Vercel ISR: 5 minutes

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('public_fundraising')
      .select('aktuell_eur, ziel_eur, letzte_aktualisierung, sync_status')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Nicht verfügbar' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Fundraising API error:', err)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}
