import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ZellenKarte } from '@/components/ZellenKarte'
import { ZellenListe } from '@/components/ZellenListe'
import { SectionReveal } from '@/components/AnimatedCounter'
import { HeroImageLightbox } from '@/components/HeroImageLightbox'
import { MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Zellen weltweit – Back to Balance',
  description: 'BtB-Zellen weltweit auf der Karte. Lokale Gemeinschaften und Unternehmen, die gemeinsam wirtschaften und das BtB-Modell leben.',
}

export default async function ZellenPage() {
  return (
    <>
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0a1520',
        padding: '5rem 1.5rem 4rem', textAlign: 'center',
      }}>
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
          alt="Sonnenlicht im Wald – vernetzte Natur"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroImageLightbox
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
          alt="Sonnenlicht im Wald – vernetzte Natur"
        />
        <div className="hero-text" style={{ maxWidth: 680, position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            color: 'var(--btb-creme)',
            marginBottom: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap',
          }}>
            <MapPin size={40} style={{ color: 'var(--btb-oliv)' }} />
            BtB-Zellen weltweit
          </h1>
          <p style={{ color: 'var(--btb-creme)', opacity: 0.8, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
            Überall auf der Welt entstehen BtB-Zellen — lokale Gemeinschaften und Unternehmen, die gemeinsam wirtschaften und das BtB-Modell im Alltag leben.
          </p>
        </div>
      </section>

      {/* Karte */}
      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb">
          <SectionReveal>
            <ZellenKarte />
          </SectionReveal>
        </div>
      </section>

      {/* Durchsuchbare Liste */}
      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb" style={{ maxWidth: 800 }}>
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              color: 'var(--btb-oliv)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}>
              Alle Zellen
            </h2>
            <p style={{ textAlign: 'center', opacity: 0.65, marginBottom: '2rem' }}>
              Finde eine Zelle in deiner Nähe oder entdecke, was anderswo entsteht.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <ZellenListe />
          </SectionReveal>
        </div>
      </section>

      {/* Was ist eine Zelle */}
      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb" style={{ maxWidth: 680 }}>
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              color: 'var(--btb-oliv)',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}>
              Was ist eine Zelle?
            </h2>
            <div className="prose-btb">
              <p>
                Eine BtB-Zelle ist eine wirtschaftliche Einheit im BtB-Universum. Das kann eine kleine Gruppe von Freiberuflern sein, ein Handwerksbetrieb, eine Praxis — aber genauso ein großes Unternehmen mit vielen Mitarbeitern.
              </p>
              <p>
                Entscheidend ist nicht die Größe, sondern die Teilnahme am System: gemeinsamer Pool, gleicher Stundensatz, transparente Wirtschaft. Jede Zelle ist autonom in ihren Entscheidungen, aber verbunden mit allen anderen durch gemeinsame Werte und das BtB-Modell.
              </p>
              <p>
                Zellen sind die Orte, an denen BtB lebendig wird. Nicht in Konzepten und Dokumenten, sondern in echten Beziehungen und konkreter Zusammenarbeit.
              </p>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/konzept/gemeinschaft" className="btn-primary">
                Mehr über Gemeinschaft
              </Link>
              <Link href="/mitmachen" className="btn-secondary">
                Eigene Zelle gründen
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
