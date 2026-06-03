import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['de', 'en', 'zh', 'es', 'hi', 'ar', 'bn', 'pt', 'ru', 'ja', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'de'
export const rtlLocales: Locale[] = ['ar']

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate locale
  const locale = await requestLocale
  if (!locale || !locales.includes(locale as Locale)) notFound()

  const loadMessages = async (ns: string) => {
    try {
      return (await import(`./messages/${locale}/${ns}.json`)).default
    } catch {
      try {
        return (await import(`./messages/en/${ns}.json`)).default
      } catch {
        return {}
      }
    }
  }

  const [common, home, konzept, koerperarbeit, faq, presse, angebote] = await Promise.all([
    loadMessages('common'),
    loadMessages('home'),
    loadMessages('konzept'),
    loadMessages('koerperarbeit'),
    loadMessages('faq'),
    loadMessages('presse'),
    loadMessages('angebote'),
  ])

  return {
    locale,
    messages: { common, home, konzept, koerperarbeit, faq, presse, angebote },
  }
})
