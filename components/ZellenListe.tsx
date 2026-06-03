'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Users, ChevronDown, ExternalLink } from 'lucide-react'

interface Zelle {
  name: string
  city: string
  country: string
  lat: number
  lng: number
  status: string
  beschreibung?: string
  mitglieder?: number
  berufe?: string[]
  gruendung?: string
}

const FREIBURG: Zelle = {
  name: 'Zelle Freiburg',
  city: 'Freiburg im Breisgau',
  country: 'Deutschland',
  lat: 47.9929,
  lng: 7.8421,
  status: 'active',
  beschreibung: 'Die erste BtB-Zelle. Hier entsteht das Modell, das sich weltweit verbreiten soll. Körperarbeit, Gemeinschaft und gemeinsames Wirtschaften — direkt vor Ort in Freiburg.',
  mitglieder: 1,
  berufe: ['Körperarbeit', 'Softwareentwicklung'],
  gruendung: 'In Gründung',
}

export function ZellenListe() {
  const [zellen, setZellen] = useState<Zelle[]>([FREIBURG])
  const [suche, setSuche] = useState('')
  const [offen, setOffen] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/public/cells')
      .then(r => r.json())
      .then(data => {
        const fetched = Array.isArray(data) ? data : []
        const hasFreiburg = fetched.some((c: Zelle) => c.city?.includes('Freiburg'))
        setZellen(hasFreiburg ? fetched : [FREIBURG, ...fetched])
      })
      .catch(() => {})
  }, [])

  const gefiltert = zellen.filter(z => {
    const term = suche.toLowerCase()
    return (
      z.name.toLowerCase().includes(term) ||
      z.city.toLowerCase().includes(term) ||
      z.country.toLowerCase().includes(term) ||
      z.berufe?.some(b => b.toLowerCase().includes(term))
    )
  })

  return (
    <div>
      {/* Suchfeld */}
      <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto 2rem' }}>
        <Search size={18} style={{
          position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
          color: 'var(--btb-oliv)', opacity: 0.5,
        }} />
        <input
          type="text"
          placeholder="Zelle suchen (Stadt, Land, Beruf …)"
          value={suche}
          onChange={e => setSuche(e.target.value)}
          style={{
            width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem',
            borderRadius: 10, border: '2px solid var(--btb-oliv)',
            background: 'var(--btb-weiss)', fontSize: '0.95rem',
            fontFamily: 'inherit', color: 'var(--btb-dunkel)', outline: 'none',
          }}
        />
      </div>

      {/* Liste */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {gefiltert.map(zelle => {
          const isOpen = offen === zelle.name
          return (
            <div key={zelle.name} style={{
              borderRadius: 10,
              border: `2px solid ${isOpen ? 'var(--btb-oliv)' : 'rgba(143,169,66,0.25)'}`,
              background: isOpen ? 'var(--btb-weiss)' : 'rgba(255,255,255,0.5)',
              overflow: 'hidden',
              transition: 'border-color 0.3s, background 0.3s',
            }}>
              {/* Header */}
              <button
                onClick={() => setOffen(isOpen ? null : zelle.name)}
                style={{
                  width: '100%', padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '0.75rem', background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={20} style={{ color: 'var(--btb-oliv)', flexShrink: 0 }} />
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-garamond)', fontSize: '1.15rem',
                      color: 'var(--btb-dunkel)', margin: 0,
                    }}>
                      {zelle.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, margin: 0 }}>
                      {zelle.city}, {zelle.country}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: zelle.status === 'active' ? 'var(--btb-oliv)' : 'var(--btb-blau)',
                    background: zelle.status === 'active' ? 'rgba(143,169,66,0.1)' : 'rgba(42,124,171,0.1)',
                    padding: '0.15rem 0.5rem', borderRadius: 4,
                  }}>
                    {zelle.status === 'active' ? 'Aktiv' : zelle.gruendung || 'Geplant'}
                  </span>
                  <ChevronDown size={18} style={{
                    color: 'var(--btb-oliv)', flexShrink: 0,
                    transition: 'transform 0.3s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </div>
              </button>

              {/* Details */}
              <div style={{
                maxHeight: isOpen ? '400px' : '0',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.3s ease',
              }}>
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  {zelle.beschreibung && (
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.8, marginBottom: '1rem' }}>
                      {zelle.beschreibung}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    {zelle.mitglieder && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--btb-blau)' }}>
                        <Users size={15} /> {zelle.mitglieder} {zelle.mitglieder === 1 ? 'Mitglied' : 'Mitglieder'}
                      </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--btb-oliv)' }}>
                      <MapPin size={15} /> {zelle.city}
                    </span>
                  </div>

                  {zelle.berufe && zelle.berufe.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {zelle.berufe.map(beruf => (
                        <span key={beruf} style={{
                          fontSize: '0.75rem', padding: '0.15rem 0.5rem',
                          borderRadius: 4, background: 'rgba(143,169,66,0.1)',
                          color: 'var(--btb-oliv)', fontWeight: 500,
                        }}>
                          {beruf}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {gefiltert.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
            Keine Zellen gefunden. Neue Zellen sind jederzeit willkommen!
          </p>
        )}
      </div>
    </div>
  )
}
