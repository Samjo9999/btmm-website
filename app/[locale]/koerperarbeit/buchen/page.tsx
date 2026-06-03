'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import contactData from '@/data/contact.json'

const BookingWidget = dynamic(
  () => import('@/components/BookingWidget').then(mod => ({ default: mod.BookingWidget })),
  { ssr: false, loading: () => <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>Lade Buchungswidget...</div> }
)

export default function BuchenPage() {
  return (
    <div suppressHydrationWarning>
      <section style={{
        background: 'var(--btb-weiss)',
        padding: '2rem 1.5rem 0',
      }}>
        <div className="container-btb" style={{ maxWidth: 800 }}>
          <p style={{ color: 'var(--btb-dunkel)', opacity: 0.6, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <Link href="/koerperarbeit" style={{ color: 'var(--btb-dunkel)', opacity: 0.6, textDecoration: 'none' }}>Körperarbeit</Link>
            {' › '}
            <Link href="/koerperarbeit/preise" style={{ color: 'var(--btb-dunkel)', opacity: 0.6, textDecoration: 'none' }}>Preise</Link>
            {' › Buchen'}
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--btb-weiss)', padding: '1rem 1.5rem 3rem' }}>
        <div className="container-btb" style={{ maxWidth: 800 }}>
          <BookingWidget companyId={contactData.company_id ?? ''} />
        </div>
      </section>
    </div>
  )
}
