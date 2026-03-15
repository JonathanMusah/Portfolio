'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PersonalInfoForm {
  name: string
  title: string
  bio: string
  email: string
  location: string
  github: string
  linkedin: string
  twitter: string
  website: string
  resumeUrl: string
}

const emptyForm: PersonalInfoForm = {
  name: '',
  title: '',
  bio: '',
  email: '',
  location: '',
  github: '',
  linkedin: '',
  twitter: '',
  website: '',
  resumeUrl: '',
}

export default function PersonalInfoAdmin() {
  const router = useRouter()
  const [form, setForm] = useState<PersonalInfoForm>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/personal-info')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setForm({
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            email: data.email || '',
            location: data.location || '',
            github: data.github || '',
            linkedin: data.linkedin || '',
            twitter: data.twitter || '',
            website: data.website || '',
            resumeUrl: data.resumeUrl || '',
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/personal-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Personal info saved successfully!' })
        router.refresh()
      } else {
        const data = await res.json()
        setMessage({ type: 'error', text: data.error || 'Failed to save' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong' })
    } finally {
      setSaving(false)
    }
  }

  const field = (
    key: keyof PersonalInfoForm,
    label: string,
    type = 'text',
    required = false,
    placeholder = ''
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
      />
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Personal Info</h1>
        <p className="text-gray-600 mt-2">Update your profile and social links</p>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('name', 'Full Name', 'text', true, 'Jonathan Musah')}
            {field('title', 'Professional Title', 'text', true, 'Full-Stack Developer')}
            {field('email', 'Email', 'email', true, 'you@example.com')}
            {field('location', 'Location', 'text', false, 'City, Country')}
            {field('resumeUrl', 'Resume URL', 'url', false, 'https://...')}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              required
              rows={5}
              placeholder="A short bio about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('github', 'GitHub URL', 'url', false, 'https://github.com/username')}
            {field('linkedin', 'LinkedIn URL', 'url', false, 'https://linkedin.com/in/username')}
            {field('twitter', 'Twitter URL', 'url', false, 'https://twitter.com/username')}
            {field('website', 'Personal Website', 'url', false, 'https://yoursite.com')}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
