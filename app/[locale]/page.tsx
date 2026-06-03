import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, Users, Leaf, Smartphone, CreditCard, Layout, ExternalLink } from 'lucide-react'
import { SpendenFortschritt } from '@/components/SpendenFortschritt'
import { ZellenKarte } from '@/components/ZellenKarte'
import { AnimatedCounter, SectionReveal } from '@/components/AnimatedCounter'
import { LiveStats } from '@/components/LiveStats'
import { LogoLightbox } from '@/components/LogoLightbox'
import { HeroImageLightbox } from '@/components/HeroImageLightbox'
import { CommunityExperiencesSection } from '@/components/CommunityExperiencesSection'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Back to Balance – Wirtschaft, die trägt.',
    description: 'Back to Balance verbindet wirtschaftliche Stärke mit menschlicher Würde. Somatische Körperarbeit, Gemeinschaft und alternatives Wirtschaftsmodell in Freiburg.',
    openGraph: {
      title: 'Back to Balance – Wirtschaft, die trägt.',
      description: 'Ein alternatives Wirtschaftsmodell mit Körperarbeit und Gemeinschaft. Freiburg und weltweit.',
    },
  }
}

export default async function HomePage() {
  const t = await getTranslations('home')
  const tc = await getTranslations('common')

  return (
    <>
      {/* ── 1. HERO ── */}
      <section style={{
        minHeight: '85vh',
        background: 'var(--btb-creme)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '3rem 1.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Forest background image */}
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
          alt="Wald – ein hoch vernetztes Ökosystem"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroImageLightbox
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
          alt="Wald – ein hoch vernetztes Ökosystem"
        />
        <div className="hero-text" style={{ position: 'relative', maxWidth: 740, zIndex: 2 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <LogoLightbox
              src="/logo.png"
              alt="Back to Balance Logo"
              width={160}
              height={160}
              style={{ margin: '0 auto', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
              priority
            />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: 700,
            color: 'var(--btb-rot)',
            marginBottom: '0.5rem',
            lineHeight: 1.1,
            textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)',
          }}>
            Back to Balance
          </h1>

          <p style={{
            display: 'inline-block',
            fontSize: '0.9rem', color: '#ffffff',
            marginBottom: '1.5rem', letterSpacing: '0.05em',
            fontFamily: 'var(--font-garamond)',
            fontStyle: 'italic',
            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          }}>
            {t('hero_subtitel2')}
          </p>

          <p style={{
            fontFamily: 'var(--font-garamond)',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 600,
            color: 'var(--btb-oliv)',
            marginBottom: '1.5rem',
            lineHeight: 1.3,
            textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)',
          }}>
            {t('hero.tagline')}
          </p>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#ffffff',
            lineHeight: 1.75,
            maxWidth: 580,
            margin: '0 auto 1rem',
            fontStyle: 'italic',
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}>
            {t('hero_poetisch')}
          </p>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
            color: '#ffffff',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 2.5rem',
            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          }}>
            {t('hero.untertitel')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/konzept" className="btn-primary">
              {t('hero.cta_konzept')}
            </Link>
            <Link href="/mitmachen" className="btn-secondary">
              {t('hero.cta_mitmachen')}
            </Link>
          </div>

        </div>
      </section>

      {/* ── 1b. WAS WÄRE WENN – ausgeklammert bis Dokumente da sind ── */}

      {/* ── 2. WAS IST BTB ── */}
      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb">
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              textAlign: 'center',
              marginBottom: '0.75rem',
              color: 'var(--btb-oliv)',
            }}>
              {t('was_ist_btb.titel')}
            </h2>
            <p style={{ textAlign: 'center', opacity: 0.6, marginBottom: '3rem', maxWidth: 540, margin: '0 auto 3rem' }}>
              {t('was_ist_btb_sub')}
            </p>
          </SectionReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                icon: <TrendingUp size={32} style={{ color: 'var(--btb-rot)' }} />,
                titel: t('was_ist_btb.wirtschaft_titel'),
                text: t('was_ist_btb.wirtschaft_text'),
                href: '/konzept/wirtschaft',
              },
              {
                icon: <Users size={32} style={{ color: 'var(--btb-blau)' }} />,
                titel: t('was_ist_btb.gemeinschaft_titel'),
                text: t('was_ist_btb.gemeinschaft_text'),
                href: '/konzept/gemeinschaft',
              },
              {
                icon: <Leaf size={32} style={{ color: 'var(--btb-oliv)' }} />,
                titel: t('was_ist_btb.nachhaltigkeit_titel'),
                text: t('was_ist_btb.nachhaltigkeit_text'),
                href: '/konzept',
              },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className="card-btb" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '1.3rem',
                    color: 'var(--btb-dunkel)',
                    marginBottom: '0.75rem',
                  }}>
                    {item.titel}
                  </h3>
                  <p style={{ color: 'var(--btb-dunkel)', opacity: 0.75, lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {item.text}
                  </p>
                  <Link href={item.href} style={{ color: 'var(--btb-blau)', fontWeight: 600, fontSize: '0.9rem' }}>
                    {tc('actions.mehr_erfahren')} →
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LIVE STATS ── */}
      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb">
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              textAlign: 'center',
              color: 'var(--btb-oliv)',
              marginBottom: '3rem',
            }}>
              {t('stats.titel')}
            </h2>
          </SectionReveal>
          <LiveStats />
        </div>
      </section>

      {/* ── 5. APP TEASER ── */}
      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb">
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              textAlign: 'center',
              color: 'var(--btb-oliv)',
              marginBottom: '0.5rem',
            }}>
              {t('app_teaser.titel')}
            </h2>
            <p style={{ textAlign: 'center', opacity: 0.65, marginBottom: '2.5rem' }}>
              {t('app_teaser.untertitel')}
            </p>
          </SectionReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}>
            {[
              { icon: <Users size={24} />, titel: t('app_teaser.pool_titel'), text: t('app_teaser.pool_text') },
              { icon: <CreditCard size={24} />, titel: t('app_teaser.coins_titel'), text: t('app_teaser.coins_text') },
              { icon: <Layout size={24} />, titel: t('app_teaser.workspace_titel'), text: t('app_teaser.workspace_text') },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <div className="card-btb" style={{ textAlign: 'center' }}>
                  <div style={{
                    color: 'var(--btb-blau)',
                    marginBottom: '0.75rem',
                    display: 'flex', justifyContent: 'center',
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-garamond)',
                    fontSize: '1.1rem',
                    color: 'var(--btb-dunkel)',
                    marginBottom: '0.5rem',
                  }}>
                    {item.titel}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--btb-dunkel)', opacity: 0.7, lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/app" className="btn-secondary">
              {t('app_teaser.cta')}
            </Link>
            <a
              href="https://app.backtobalance.online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Login <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── 5b. INFINITY LOOP ── */}
      <section style={{
        background: 'linear-gradient(135deg, #1a5a8a 0%, var(--btb-blau) 50%, #1a5a8a 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}>
        <div className="container-btb" style={{ maxWidth: 680 }}>
          <SectionReveal>
            <Image
              src="/infinity-gold.png"
              alt="Infinity Loop – Back to Balance"
              width={200}
              height={200}
              style={{ margin: '0 auto 1rem', objectFit: 'contain' }}
            />
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              color: 'var(--btb-creme)',
              marginBottom: '0.75rem',
              fontStyle: 'italic',
            }}>
              Infinity Loop Reaching Its Breaking Point
            </h2>
            <p style={{
              color: 'var(--btb-creme)',
              opacity: 0.85,
              lineHeight: 1.75,
              fontSize: '1.05rem',
              maxWidth: 540,
              margin: '0 auto',
            }}>
              {t('infinity.text')}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 6. SPENDENAUFRUF ── */}
      <section className="section" style={{ background: 'var(--btb-weiss)' }}>
        <div className="container-btb">
          <div style={{
            maxWidth: 680, margin: '0 auto',
            background: 'var(--btb-creme)',
            borderRadius: 16, padding: '2.5rem',
            border: '1px solid rgba(143,169,66,0.2)',
          }}>
            <SectionReveal>
              <h2 style={{
                fontFamily: 'var(--font-garamond)',
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                color: 'var(--btb-oliv)',
                marginBottom: '0.75rem',
              }}>
                {t('spenden_teaser.titel')}
              </h2>
              <p style={{ lineHeight: 1.75, opacity: 0.8, marginBottom: '1.75rem' }}>
                {t('spenden_teaser.text')}
              </p>
              <SpendenFortschritt />
              <div style={{ marginTop: '1.5rem' }}>
                <Link href="/spenden" className="btn-oliv">
                  {t('spenden_teaser.cta')}
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── 6b. COMMUNITY EXPERIENCES ── */}
      <CommunityExperiencesSection />

      {/* ── 7. ZELLEN KARTE ── */}
      <section className="section" style={{ background: 'var(--btb-creme)' }}>
        <div className="container-btb">
          <SectionReveal>
            <h2 style={{
              fontFamily: 'var(--font-garamond)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              textAlign: 'center',
              color: 'var(--btb-oliv)',
              marginBottom: '0.5rem',
            }}>
              {t('zellen_karte.titel')}
            </h2>
            <p style={{ textAlign: 'center', opacity: 0.65, marginBottom: '2rem' }}>
              {t('zellen_karte.text')}
            </p>
          </SectionReveal>
          <ZellenKarte />
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/zellen" className="btn-secondary">
              {t('zellen_alle')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
