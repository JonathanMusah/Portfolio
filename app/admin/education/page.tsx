'use client'

import { useState, useEffect, useCallback } from 'react'

interface Education {
  id: string
  institution: string
  degree: string
  field: string | null
  startDate: string
  endDate: string | null
  description: string | null
  order: number
}

const emptyForm = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
  order: 0,
}

export default function EducationAdmin() {
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchEducations = useCallback(async () => {
    const res = await fetch('/api/admin/education')
    const data = await res.json()
    setEducations(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEducations()
  }, [fetchEducations])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const isEdit = editingId !== null
      const url = isEdit ? `/api/admin/education/${editingId}` : '/api/admin/education'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          endDate: form.endDate || null,
        }),
      })

      if (res.ok) {
        setForm(emptyForm)
        setEditingId(null)
        setShowForm(false)
        await fetchEducations()
        showMessage('success', isEdit ? 'Education updated!' : 'Education added!')
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
    if (!confirm('Delete this education entry?')) return
    try {
      const res = await fetch(`/api/admin/education/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchEducations()
        showMessage('success', 'Deleted')
      }
    } catch {
      showMessage('error', 'Failed to delete')
    }
  }

  const startEdit = (edu: Education) => {
    setEditingId(edu.id)
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field || '',
      startDate: edu.startDate ? edu.startDate.split('T')[0] : '',
      endDate: edu.endDate ? edu.endDate.split('T')[0] : '',
      description: edu.description || '',
      order: edu.order,
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
          <h1 className="text-3xl font-bold text-gray-900">Education</h1>
          <p className="text-gray-600 mt-2">Manage your education history</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + Add Education
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
            {editingId ? 'Edit Education' : 'New Education'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                <input
                  type="text"
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  required
                  placeholder="e.g. University of Ghana"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                <input
                  type="text"
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  required
                  placeholder="e.g. BSc Computer Science"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date <span className="text-gray-400">(leave empty if current)</span>
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="Describe your studies, achievements, etc."
                className={inputClass}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={cancelForm} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? 'Saving…' : editingId ? 'Update' : 'Add Education'}
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
      ) : educations.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">No education entries yet.</div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <div key={edu.id} className="card">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-primary-600 font-medium">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(edu.startDate).getFullYear()} —{' '}
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(edu)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
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
