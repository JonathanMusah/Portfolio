export function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) {
    return configured.replace(/\/$/, '')
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}
