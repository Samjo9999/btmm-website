'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatedCounter, SectionReveal } from './AnimatedCounter'

export function LiveStats() {
  const t = useTranslations('home')
  const [donationAmount, setDonationAmount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/fundraising')
      .then(r => r.json())
      .then(data => {
        if (data?.aktuell_eur !== undefined) {
          setDonationAmount(data.aktuell_eur)
        }
      })
      .catch(() => {})
  }, [])

  const stats = [
    {
      value: 1,
      label: t('stats.gruendungsmitglieder'),
      suffix: ` ${t('stats.gruendungsmitglieder_ziel')}`,
      color: 'var(--btb-rot)',
    },
    {
      value: 1,
      label: t('stats.aktive_zellen'),
      suffix: '',
      color: 'var(--btb-blau)',
    },
    {
      value: donationAmount ?? 0,
      label: t('stats.gespendete_euro'),
      suffix: ' €',
      color: 'var(--btb-oliv)',
      note: donationAmount === null ? 'Wird geladen...' : t('stats.gespendete_euro_hinweis'),
    },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem',
    }}>
      {stats.map((stat, i) => (
        <SectionReveal key={i} delay={i * 0.15}>
          <div style={{
            background: 'var(--btb-weiss)',
            borderRadius: 12, padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 2px 16px rgba(26,21,5,0.06)',
            border: `2px solid ${stat.color}22`,
          }}>
            <div style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: stat.color,
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={0}
              />
            </div>
            <div style={{
              fontWeight: 600,
              color: 'var(--btb-dunkel)',
              fontSize: '0.95rem',
              marginBottom: '0.25rem',
            }}>
              {stat.label}
            </div>
            {stat.note && (
              <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                {stat.note}
              </div>
            )}
          </div>
        </SectionReveal>
      ))}
    </div>
  )
}
