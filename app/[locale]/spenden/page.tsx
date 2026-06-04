import type { Metadata } from 'next'
import Image from 'next/image'
import { Heart, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SectionReveal } from '@/components/AnimatedCounter'
import { HeroImageLightbox } from '@/components/HeroImageLightbox'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Spenden – Back to Meaning Maximization',
  description: 'Unterstütze Back to Meaning Maximization mit deiner Spende. Jeder Beitrag hilft uns, eine gerechtere Wirtschaft aufzubauen.',
}

export default async function SpendenPage() {
  return (
    <>
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1a1505',
        padding: '5rem 1.5rem 4rem', textAlign: 'center',
      }}>
        <Image
          src="https://images.unsplash.com/photo-1526304640581-d334cdbbf35f?w=1920&q=80"
          alt="Hände helfen sich gegenseitig – Solidarität"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroImageLightbox
          src="https://images.unsplash.com/photo-1526304640581-d334cdbbf35f?w=1920&q=80"
          alt="Hände helfen sich gegenseitig – Solidarität"
        />
        <div className="hero-text" style={{ maxWidth: 680, position: 'relative', zIndex: 2 }}>
          <SectionReveal>
            <h1 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              color: 'var(--btb-creme)',
              marginBottom: '1rem',
            }}>
              Spenden
            </h1>
            <p style={{ color: 'var(--btb-creme)', opacity: 0.85, lineHeight: 1.8, fontSize: '1.05rem' }}>
              Jede Spende hilft uns, die Infrastruktur aufzubauen, die eine gerechtere Wirtschaft ermöglicht. Egal wie klein — dein Beitrag zählt.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb">
          <SectionReveal>
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-garamond)',
                color: 'var(--btb-rot)',
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}>
                Spendenstand
              </h2>

              {/* Progress Bar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                maxWidth: 500,
                margin: '0 auto 2rem',
              }}>
                <div style={{
                  width: '100%',
                  height: 32,
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '2px solid rgba(182,24,24,0.2)',
                }}>
                  <div style={{
                    height: '100%',
                    width: '35%',
                    background: 'linear-gradient(90deg, var(--btb-rot), var(--btb-oliv))',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '1rem',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}>
                    35%
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: 'var(--btb-dunkel)',
                  opacity: 0.7,
                }}>
                  <span><strong style={{ color: 'var(--btb-dunkel)' }}>3.500 €</strong> gespendet</span>
                  <span><strong style={{ color: 'var(--btb-dunkel)' }}>10.000 €</strong> Ziel</span>
                </div>
              </div>

              <p style={{
                textAlign: 'center',
                color: 'var(--btb-dunkel)',
                opacity: 0.75,
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: 600,
                margin: '0 auto',
              }}>
                Mit den gesammelten Mitteln bauen wir die digitale Infrastruktur auf und unterstützen die Gründungsmitglieder in der Aufbauphase. Jeden Euro verwenden wir transparent und nachvollziehbar.
              </p>
            </div>
          </SectionReveal>

          {/* Warum Spenden? */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
            marginBottom: '3rem',
          }}>
            <SectionReveal>
              <div className="card-btb">
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'rgba(182,24,24,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Heart size={28} style={{ color: 'var(--btb-rot)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-garamond)',
                  color: 'var(--btb-rot)',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                }}>
                  Transparenz
                </h3>
                <p style={{ color: 'var(--btb-dunkel)', opacity: 0.7, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Jeder Cent wird dokumentiert. Du siehst genau, wo deine Spende eingesetzt wird.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="card-btb">
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'rgba(42,124,171,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <TrendingUp size={28} style={{ color: 'var(--btb-blau)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-garamond)',
                  color: 'var(--btb-blau)',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                }}>
                  Wirkung
                </h3>
                <p style={{ color: 'var(--btb-dunkel)', opacity: 0.7, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Deine Spende trägt direkt zum Aufbau einer gerechtere Wirtschaft bei.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="card-btb">
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'rgba(143,169,66,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Heart size={28} style={{ color: 'var(--btb-oliv)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-garamond)',
                  color: 'var(--btb-oliv)',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem',
                }}>
                  Gemeinschaft
                </h3>
                <p style={{ color: 'var(--btb-dunkel)', opacity: 0.7, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Du wirst Teil einer Bewegung, die gemeinsam Wirtschaft neu denkt.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Stripe Donation Form Section */}
      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb" style={{ maxWidth: 500 }}>
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              color: 'var(--btb-oliv)',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}>
              Jetzt spenden
            </h2>
            <p style={{
              textAlign: 'center',
              opacity: 0.75,
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Wähle einen Betrag oder gib einen eigenen Betrag ein. Alle Spenden sind sicher über Stripe verarbeitet.
            </p>

            {/* Donation Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}>
              {[5, 10, 25, 50, 100, 250].map((amount) => (
                <button
                  key={amount}
                  style={{
                    padding: '0.75rem 1rem',
                    border: '2px solid rgba(182,24,24,0.3)',
                    background: 'var(--btb-weiss)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'var(--btb-rot)',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(182,24,24,0.05)'
                    e.currentTarget.style.borderColor = 'rgba(182,24,24,0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--btb-weiss)'
                    e.currentTarget.style.borderColor = 'rgba(182,24,24,0.3)'
                  }}
                >
                  {amount} €
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontWeight: 500,
                marginBottom: '0.4rem',
                fontSize: '0.9rem',
                color: 'var(--btb-dunkel)',
              }}>
                Oder eigener Betrag (€)
              </label>
              <input
                type="number"
                placeholder="z.B. 75"
                min="1"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1.5px solid rgba(0,0,0,0.1)',
                  borderRadius: 8,
                  fontFamily: 'var(--font-garamond)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Stripe Payment Button */}
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sicher spenden via Stripe
            </button>

            <p style={{
              textAlign: 'center',
              fontSize: '0.8rem',
              color: 'var(--btb-dunkel)',
              opacity: 0.6,
              marginTop: '1rem',
            }}>
              Deine Spende ist sicher und steuerlich absetzbar.
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
