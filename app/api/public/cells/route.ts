import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const revalidate = 3600 // Vercel ISR: 1 hour

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('universe_cells')
      .select('name, city, country, lat, lng, status')
      .eq('status', 'active')

    if (error) {
      console.error('Supabase cells error:', error)
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('Cells API error:', err)
    return NextResponse.json([], { status: 200 })
  }
}
