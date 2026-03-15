import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// This layout overrides the admin layout for the login page
export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // If already logged in, redirect to admin dashboard
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/admin')
  }

  return <>{children}</>
}

