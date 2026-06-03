// Root layout for Next.js App Router
// When using next-intl with [locale] segments, this file must exist
// but should not render html/body tags since [locale]/layout.tsx handles them.
// See: https://next-intl-docs.vercel.app/docs/getting-started/app-router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children as unknown as React.ReactElement
}
