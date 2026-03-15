'use client'

import { useState, useEffect, useCallback } from 'react'

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  order: number
}

const CATEGORIES = [
  'Frontend Development',
  'Backend & Database',
  'Programming & Logic',
  'Tools & Version Control',
  'Specialized Systems',
  'Soft Skills',
  'Other',
]

const emptyForm = { name: '', category: CATEGORIES[0], proficiency: 80, order: 0 }

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchSkills = useCallback(async () => {
    const res = await fetch('/api/admin/skills')
    const data = await res.json()
    setSkills(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setForm(emptyForm)
        await fetchSkills()
        showMessage('success', 'Skill added!')
      } else {
        showMessage('error', 'Failed to add skill')
      }
    } catch {
      showMessage('error', 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (id: string) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      if (res.ok) {
        setEditingId(null)
        await fetchSkills()
        showMessage('success', 'Skill updated!')
      } else {
        showMessage('error', 'Failed to update skill')
      }
    } catch {
      showMessage('error', 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchSkills()
        showMessage('success', 'Skill deleted')
      }
    } catch {
      showMessage('error', 'Failed to delete')
    }
  }

  const groupedSkills = skills.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
        <p className="text-gray-600 mt-2">Manage your skills and proficiency levels</p>
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

      {/* Add Skill Form */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g. React"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency: {form.proficiency}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-primary-600"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={saving}
              className="w-full btn-primary disabled:opacity-50"
            >
              {saving ? 'Adding…' : 'Add Skill'}
            </button>
          </div>
        </form>
      </div>

      {/* Skills List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : skills.length === 0 ? (
        <div className="card text-center text-gray-500 py-12">No skills added yet.</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, catSkills]) => (
            <div key={category} className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {category}
              </h2>
              <div className="space-y-3">
                {catSkills.map((skill) => (
                  <div key={skill.id}>
                    {editingId === skill.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
                        />
                        <select
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
                        >
                          {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <div>
                          <span className="text-xs text-gray-600 mb-1 block">
                            Proficiency: {editForm.proficiency}%
                          </span>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={editForm.proficiency}
                            onChange={(e) => setEditForm({ ...editForm, proficiency: Number(e.target.value) })}
                            className="w-full accent-primary-600"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(skill.id)}
                            disabled={saving}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 flex items-center gap-4">
                          <span className="font-medium text-gray-800 w-40 shrink-0">{skill.name}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-10 text-right">{skill.proficiency}%</span>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditingId(skill.id)
                              setEditForm({
                                name: skill.name,
                                category: skill.category,
                                proficiency: skill.proficiency,
                                order: skill.order,
                              })
                            }}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="px-3 py-1 text-sm border border-red-200 rounded-lg hover:bg-red-50 text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
