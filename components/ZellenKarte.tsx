'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

type Cell = {
  name: string
  city: string
  country: string
  lat: number
  lng: number
  status: string
}

// Dynamically imported to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 480,
      background: 'var(--btb-creme)',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1rem',
      color: 'var(--btb-dunkel)', opacity: 0.6,
    }}>
      <MapPin size={32} />
      <p>Karte wird geladen...</p>
    </div>
  ),
})

const FREIBURG_CELL: Cell = {
  name: 'Zelle Freiburg',
  city: 'Freiburg im Breisgau',
  country: 'Deutschland',
  lat: 47.9929,
  lng: 7.8421,
  status: 'active',
}

export function ZellenKarte() {
  const [cells, setCells] = useState<Cell[]>([FREIBURG_CELL])

  useEffect(() => {
    fetch('/api/public/cells')
      .then(r => r.json())
      .then(data => {
        const fetched = Array.isArray(data) ? data : []
        const hasFreiburg = fetched.some(c => c.city?.includes('Freiburg'))
        setCells(hasFreiburg ? fetched : [FREIBURG_CELL, ...fetched])
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '2px solid var(--btb-creme)' }}>
      <LeafletMap cells={cells} />
    </div>
  )
}
