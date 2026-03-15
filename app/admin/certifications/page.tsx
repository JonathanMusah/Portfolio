'use client'

import { useState, useEffect, useCallback } from 'react'

interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  credentialId: string | null
  credentialUrl: string | null
  order: number
}

const emptyForm = {
  name: '',
  issuer: '',
  issueDate: '',
  expiryDate: '',
  credentialId: '',
  credentialUrl: '',
  order: 0,
}

export default function CertificationsAdmin() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchCerts = useCallback(async () => {
    const res = await fetch('/api/admin/certifications')
    const data = await res.json()
    setCerts(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCerts()
  }, [fetchCerts])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const isEdit = editingId !== null
      const url = isEdit ? `/api/admin/certifications/${editingId}` : '/api/admin/certifications'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          expiryDate: form.expiryDate || null,
          credentialUrl: form.credentialUrl || null,
        }),
      })

      if (res.ok) {
        setForm(emptyForm)
        setEditingId(null)
        setShowForm(false)
        await fetchCerts()
        showMessage('success', isEdit ? 'Certification updated!' : 'Certification added!')
      } else {
        showMessage('error', 'Failed to save')
      }
    } catch {
      showMessage('error', 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return
    try {
      const res = await fetch(`/api/admin/certifications/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchCerts()
        showMessage('success', 'Deleted')
      }
    } catch {
      showMessage('error', 'Failed to delete')
    }
  }

  const startEdit = (cert: Certification) => {
    setEditingId(cert.id)
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate ? cert.issueDate.split('T')[0] : '',
      expiryDate: cert.expiryDate ? cert.expiryDate.split('T')[0] : '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      order: cert.order,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900'

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certifications</h1>
          <p className="text-gray-600 mt-2">Manage your certifications and credentials</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + Add Certification
          </button>
        )}
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

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Certification' : 'New Certification'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. AWS Certified Developer"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuer *</label>
                <input
                  type="text"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  required
                  placeholder="e.g. Amazon Web Services"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                <input
                  type="date"
                  value={form.issueDate}
                  onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={form.credentialId}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  placeholder="e.g. ABC123XYZ"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
                <input
                  type="url"
                  value={form.credentialUrl}
                  onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={cancelForm} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving…' : editingId ? 'Update' : 'Add Certification'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : certs.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">No certifications added yet.</div>
      ) : (
        <div className="space-y-4">
          {certs.map((cert) => (
            <div key={cert.id} className="card">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-primary-600 font-medium">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    {cert.expiryDate && (
                      <> · Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</>
                    )}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-400 mt-1 font-mono">ID: {cert.credentialId}</p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:underline mt-1 inline-block"
                    >
                      View credential →
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(cert)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="px-3 py-1 text-sm border border-red-200 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
