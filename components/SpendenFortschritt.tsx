'use client'
import { useEffect, useState } from 'react'
import milestones from '@/data/milestones.json'

type Data = {
  aktuell_eur: number
  ziel_eur: number
  letzte_aktualisierung: string
  sync_status: 'ok' | 'error' | 'pending'
}

export function SpendenFortschritt() {
  const [data, setData] = useState<Data | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/fundraising')
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  if (!loaded || !data) {
    return (
      <div style={{ height: 56, background: 'var(--btb-creme)', borderRadius: 8, animation: 'pulse 2s infinite' }} />
    )
  }

  if ('error' in data) {
    return (
      <div style={{ padding: '1rem', background: 'var(--btb-creme)', borderRadius: 8, opacity: 0.6 }}>
        Spendendaten momentan nicht verfügbar.
      </div>
    )
  }

  const prozent = Math.min((data.aktuell_eur / data.ziel_eur) * 100, 100)
  const pending = data.sync_status === 'pending'

  return (
    <div>
      {/* Progress bar */}
      <div style={{
        background: 'rgba(240,233,182,0.5)',
        borderRadius: 8, height: 24, overflow: 'hidden', marginBottom: 12,
        border: '1px solid var(--btb-creme)',
      }}>
        <div style={{
          width: `${prozent}%`,
          height: '100%',
          background: 'var(--btb-oliv)',
          borderRadius: 8,
          transition: 'width 1.2s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
        }}>
          {prozent > 15 && (
            <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 600 }}>
              {prozent.toFixed(0)}%
            </span>
          )}
        </div>
      </div>

      {/* Amounts */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <strong style={{ color: 'var(--btb-rot)', fontSize: '1.4rem', fontFamily: 'var(--font-garamond)' }}>
          {pending ? '—' : data.aktuell_eur.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </strong>
        <span style={{ color: 'var(--btb-dunkel)', opacity: 0.6, fontSize: '0.9rem' }}>
          von {data.ziel_eur.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </span>
      </div>

      {pending && (
        <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: 8 }}>
          Automatische Aktualisierung wird eingerichtet.
        </p>
      )}
      {data.sync_status === 'ok' && (
        <p style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: 8 }}>
          Zuletzt aktualisiert: {new Date(data.letzte_aktualisierung).toLocaleString('de-DE')}
        </p>
      )}
      {data.sync_status === 'error' && (
        <p style={{ fontSize: '0.75rem', color: 'var(--btb-rot)', opacity: 0.6, marginTop: 8 }}>
          Synchronisierung fehlgeschlagen. Nächster Versuch in Kürze.
        </p>
      )}

      {/* Milestones */}
      {!pending && milestones.milestones.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.6, marginBottom: '0.5rem' }}>
            Meilensteine
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {milestones.milestones.map((ms) => {
              const erreicht = data.aktuell_eur >= ms.betrag_eur
              return (
                <div key={ms.id} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  opacity: erreicht ? 1 : 0.5,
                }}>
                  <span style={{ fontSize: '1rem' }}>{erreicht ? '✅' : '⬜'}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      {ms.betrag_eur.toLocaleString('de-DE')}€ – {ms.titel}
                    </span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '0.5rem' }}>
                      {ms.beschreibung}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
