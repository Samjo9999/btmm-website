import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SpendenFortschritt } from '@/components/SpendenFortschritt'
import { SectionReveal } from '@/components/AnimatedCounter'
import { HeroImageLightbox } from '@/components/HeroImageLightbox'
import { SpendenPayment } from '@/components/SpendenPayment'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Spenden – Back to Balance',
  description: 'Unterstütze Back to Balance mit einer Spende. Live-Spendenstand aus der Datenbank. Dein Beitrag hilft beim Aufbau einer gerechteren Wirtschaft.',
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
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80"
          alt="Keimling – Wachstum durch Unterstützung"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroImageLightbox
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80"
          alt="Keimling – Wachstum durch Unterstützung"
        />
        <div className="hero-text" style={{ maxWidth: 680, position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: 'var(--btb-creme)',
            marginBottom: '1rem',
          }}>
            Spenden
          </h1>
          <p style={{
            color: 'var(--btb-oliv)',
            fontFamily: 'var(--font-garamond)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
          }}>
            Wirtschaft, die trägt – braucht Menschen, die tragen.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb" style={{ maxWidth: 760 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Prosa */}
            <SectionReveal>
              <div className="prose-btb">
                <h2>Warum wir Spenden brauchen</h2>
                <p>
                  Back to Balance ist kein Startup. Wir haben keinen Investor, keinen Exit-Plan und keine Renditeerwartungen. Wir sind eine Gemeinschaft, die versucht, gemeinsam etwas Neues aufzubauen.
                </p>
                <p>
                  In der Aufbauphase brauchen wir Mittel für das, was jede Organisation braucht: technische Infrastruktur, rechtliche Beratung für die Genossenschaftsgründung, und die Zeit der Menschen, die daran arbeiten.
                </p>
                <p>
                  Deine Spende ist kein Kauf. Sie ist ein Vertrauensvorschuss – die Wette darauf, dass dieses Modell möglich ist und es wert ist, aufgebaut zu werden.
                </p>
                <p>
                  Jeder Betrag hilft. Auch ein kleiner Beitrag ist ein Zeichen: Ja, ich glaube, dass es diese Alternative braucht.
                </p>
                <h2>Wofür das Geld genutzt wird</h2>
                <ul>
                  <li>Technische Entwicklung der BtB-App und Website</li>
                  <li>Rechtliche Beratung für die Genossenschaftsgründung</li>
                  <li>Veranstaltungen und Treffen der Gemeinschaft</li>
                  <li>Materialien und Kommunikation</li>
                  <li>Kompensation für geleistete Arbeit</li>
                </ul>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                  BtB ist aktuell kein gemeinnütziger Verein – Spenden sind daher nicht steuerlich absetzbar. Das ändert sich, sobald die e.V.-Gründung abgeschlossen ist.
                </p>
              </div>
            </SectionReveal>

            {/* Spendenstand + Zahlung */}
            <SectionReveal delay={0.2}>
              <div>
                <div className="card-btb" style={{
                  border: '2px solid rgba(143,169,66,0.2)',
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-garamond)',
                    color: 'var(--btb-oliv)',
                    fontSize: '1.3rem',
                    marginBottom: '1.25rem',
                  }}>
                    Aktueller Spendenstand
                  </h3>
                  <SpendenFortschritt />
                </div>

                <SpendenPayment />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb" style={{ maxWidth: 640, textAlign: 'center' }}>
          <SectionReveal>
            <h2 style={{ fontFamily: 'var(--font-garamond)', color: 'var(--btb-oliv)', fontSize: '2rem', marginBottom: '1rem' }}>
              Lieber Mitglied werden?
            </h2>
            <p style={{ lineHeight: 1.75, opacity: 0.8, marginBottom: '2rem' }}>
              Als Fördermitglied des e.V. unterstützt du BtB kontinuierlich und bekommst dafür Einblicke und Mitsprache.
            </p>
            <Link href="/mitmachen" className="btn-primary">
              Mitglied werden
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
