'use client'

import dynamic from 'next/dynamic'
import contactData from '@/data/contact.json'

const BookingWidget = dynamic(
  () => import('@/components/BookingWidget').then(mod => ({ default: mod.BookingWidget })),
  { ssr: false, loading: () => <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Lade Buchungswidget...</div> }
)

export function BookingWidgetClient() {
  return <BookingWidget companyId={contactData.company_id ?? ''} />
}
