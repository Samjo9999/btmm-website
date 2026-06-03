'use client'

import { useState } from 'react'
import { CreditCard, Building2, Heart, Copy, Check, Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const SPENDENBETRAEGE = [10, 25, 50, 100, 250]

const IBAN = 'DE00 0000 0000 0000 0000 00' // TODO: echte IBAN
const BIC = 'XXXXXXXXX' // TODO
const EMPFAENGER = 'Back to Balance e.V.'
const BANK = 'TODO: Bankname'
const VERWENDUNGSZWECK = 'Spende BtB'

export function SpendenPayment() {
  const [betrag, setBetrag] = useState(25)
  const [eigenBetrag, setEigenBetrag] = useState('')
  const [useEigen, setUseEigen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [laden, setLaden] = useState(false)

  const finalBetrag = useEigen ? Number(eigenBetrag) || 0 : betrag

  const copyIBAN = () => {
    navigator.clipboard.writeText(IBAN.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stripeCheckout = async () => {
    if (!finalBetrag || finalBetrag < 1) return
    setLaden(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spende_betrag: finalBetrag }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Checkout konnte nicht gestartet werden.')
    } finally {
      setLaden(false)
    }
  }

  return (
    <div>
      {/* Betragswahl */}
      <div className="card-btb" style={{ marginBottom: '1rem', border: '1.5px solid var(--btb-creme)' }}>
        <h3 style={{ fontFamily: 'var(--font-garamond)', color: 'var(--btb-dunkel)', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Betrag wählen
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {SPENDENBETRAEGE.map(b => (
            <button
              key={b}
              onClick={() => { setBetrag(b); setUseEigen(false) }}
              style={{
                padding: '0.5rem 1rem', borderRadius: 8,
                border: `1.5px solid ${!useEigen && betrag === b ? 'var(--btb-rot)' : 'var(--btb-creme)'}`,
                background: !useEigen && betrag === b ? 'rgba(182,24,24,0.08)' : 'transparent',
                color: !useEigen && betrag === b ? 'var(--btb-rot)' : 'var(--btb-dunkel)',
                cursor: 'pointer', fontWeight: !useEigen && betrag === b ? 700 : 400,
                fontFamily: 'var(--font-garamond)', fontSize: '0.9rem',
              }}
            >
              {b}€
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="number" placeholder="Eigener Betrag" value={eigenBetrag}
            onChange={(e) => { setEigenBetrag(e.target.value); setUseEigen(true) }}
            onFocus={() => setUseEigen(true)}
            style={{
              flex: 1, padding: '0.5rem 0.75rem',
              border: `1.5px solid ${useEigen ? 'var(--btb-rot)' : 'var(--btb-creme)'}`,
              borderRadius: 8, fontFamily: 'var(--font-garamond)', fontSize: '0.9rem', color: 'var(--btb-dunkel)',
            }}
            min={1}
          />
          <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>€</span>
        </div>
      </div>

      {/* Online mit Karte */}
      <div className="card-btb" style={{ border: '1.5px solid var(--btb-creme)', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <CreditCard size={20} style={{ color: 'var(--btb-blau)' }} />
          <h3 style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--btb-dunkel)' }}>
            Online mit Karte zahlen
          </h3>
        </div>
        <button
          onClick={stripeCheckout}
          disabled={laden || !finalBetrag || finalBetrag < 1}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: laden ? 0.7 : 1 }}
        >
          <Heart size={18} />
          {laden ? 'Wird vorbereitet …' : `${finalBetrag}€ online mit Karte zahlen`}
        </button>
        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.5rem', textAlign: 'center' }}>
          Sicher bezahlen per Kreditkarte, SEPA oder PayPal via Stripe
        </p>
      </div>

      {/* Banküberweisung */}
      <div className="card-btb" style={{ border: '1.5px solid var(--btb-creme)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Building2 size={20} style={{ color: 'var(--btb-blau)' }} />
          <h3 style={{ fontFamily: 'var(--font-garamond)', fontSize: '1.1rem', color: 'var(--btb-dunkel)' }}>
            Banküberweisung
          </h3>
        </div>
        <div style={{
          background: 'var(--btb-creme)', borderRadius: 8, padding: '1rem',
          fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '1rem',
        }}>
          <p><strong>Empfänger:</strong> {EMPFAENGER}</p>
          <p><strong>IBAN:</strong> {IBAN}</p>
          <p><strong>BIC:</strong> {BIC}</p>
          <p><strong>Bank:</strong> {BANK}</p>
          <p><strong>Betrag:</strong> {finalBetrag > 0 ? `${finalBetrag}€` : 'nach Wahl'}</p>
          <p><strong>Verwendung:</strong> {VERWENDUNGSZWECK}</p>
        </div>
        <button onClick={copyIBAN} className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          {copied ? <><Check size={16} /> IBAN kopiert!</> : <><Copy size={16} /> IBAN kopieren</>}
        </button>

        {/* EPC-QR-Code für Banking-Apps */}
        {finalBetrag > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--btb-dunkel)', opacity: 0.7,
            }}>
              <Smartphone size={14} />
              <span>Mit Banking-App scannen</span>
            </div>
            <div style={{
              display: 'inline-block', padding: '0.75rem',
              background: 'white', borderRadius: 12, border: '1.5px solid var(--btb-creme)',
            }}>
              <QRCodeSVG
                value={[
                  'BCD',           // Service Tag
                  '002',           // Version
                  '1',             // Encoding (UTF-8)
                  'SCT',           // SEPA Credit Transfer
                  BIC.replace(/\s/g, ''),
                  EMPFAENGER,
                  IBAN.replace(/\s/g, ''),
                  `EUR${finalBetrag}`,
                  '',              // Purpose code
                  '',              // Remittance reference
                  VERWENDUNGSZWECK,
                  '',              // Info
                ].join('\n')}
                size={160}
                level="M"
                fgColor="#1a1505"
              />
            </div>
            <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '0.5rem' }}>
              EPC-QR — kompatibel mit allen Banking-Apps
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
