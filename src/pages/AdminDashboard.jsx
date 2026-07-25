import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutGrid,
  Users,
  Building2,
  GraduationCap,
  Search,
  Download,
  Settings,
  FileBarChart,
} from 'lucide-react'
import Seal from '../components/Seal.jsx'

// Mock data — frontend-only demo, no backend/API involved.
const MOCK_RESPONSES = [
  { id: 1, institution: 'Modibbo Adama University', faculty: 'Science', department: 'Computer Science', level: '300', experienced: 'Yes', reported: 'No', date: '2026-07-02' },
  { id: 2, institution: 'University of Lagos', faculty: 'Arts', department: 'English', level: '200', experienced: 'No', reported: '—', date: '2026-07-04' },
  { id: 3, institution: 'Ahmadu Bello University', faculty: 'Engineering', department: 'Civil Engineering', level: '400', experienced: 'Yes', reported: 'Yes', date: '2026-07-05' },
  { id: 4, institution: 'University of Ibadan', faculty: 'Social Sciences', department: 'Economics', level: '100', experienced: 'Prefer not to say', reported: '—', date: '2026-07-06' },
  { id: 5, institution: 'Modibbo Adama University', faculty: 'Education', department: 'Guidance & Counselling', level: '500', experienced: 'Yes', reported: 'No', date: '2026-07-08' },
  { id: 6, institution: 'Obafemi Awolowo University', faculty: 'Law', department: 'Public Law', level: '300', experienced: 'No', reported: '—', date: '2026-07-09' },
  { id: 7, institution: 'University of Nigeria, Nsukka', faculty: 'Science', department: 'Biochemistry', level: '200', experienced: 'Yes', reported: 'Yes', date: '2026-07-10' },
  { id: 8, institution: 'University of Lagos', faculty: 'Engineering', department: 'Electrical Engineering', level: '400', experienced: 'Yes', reported: 'No', date: '2026-07-12' },
]

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: LayoutGrid, active: true },
  { label: 'Responses', icon: FileBarChart, active: false },
  { label: 'Institutions', icon: Building2, active: false },
  { label: 'Settings', icon: Settings, active: false },
]

function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="border border-line rounded-2xl bg-white p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-full bg-panel border border-line flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent" strokeWidth={1.6} />
        </div>
      </div>
      <p className="text-2xl font-display font-medium">{value}</p>
      <p className="text-sm text-neutral-500 mt-1">{label}</p>
    </motion.div>
  )
}

function downloadCSV(rows) {
  const headers = ['Institution', 'Faculty', 'Department', 'Level', 'Experienced', 'Reported', 'Date']
  const csvRows = rows.map((r) =>
    [r.institution, r.faculty, r.department, r.level, r.experienced, r.reported, r.date]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  )
  const csv = [headers.join(','), ...csvRows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'safevoice-responses.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function AdminDashboard({ navigate }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    return MOCK_RESPONSES.filter((r) => {
      const matchesQuery =
        query.trim() === '' ||
        [r.institution, r.faculty, r.department].some((f) =>
          f.toLowerCase().includes(query.toLowerCase())
        )
      const matchesFilter =
        filter === 'all' ||
        (filter === 'experienced' && r.experienced === 'Yes') ||
        (filter === 'reported' && r.reported === 'Yes') ||
        (filter === 'not-reported' && r.reported === 'No')
      return matchesQuery && matchesFilter
    })
  }, [query, filter])

  const totalResponses = MOCK_RESPONSES.length
  const institutionCount = new Set(MOCK_RESPONSES.map((r) => r.institution)).size
  const facultyCount = new Set(MOCK_RESPONSES.map((r) => r.faculty)).size

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-line bg-panel">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <Seal className="w-6 h-6" />
          <span className="font-display text-sm font-medium">Admin</span>
        </div>
        <nav className="px-3 pb-6 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors ${
                item.active ? 'bg-white border border-line text-ink font-medium shadow-soft' : 'text-neutral-500 hover:text-ink'
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={1.6} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-5 sm:px-8 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-medium tracking-tight">Overview</h1>
            <p className="text-sm text-neutral-500 mt-1">Research response summary</p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="text-xs text-neutral-500 hover:text-ink underline underline-offset-2"
          >
            Exit admin view
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          <StatCard icon={Users} label="Total responses" value={totalResponses} delay={0} />
          <StatCard icon={Building2} label="Institutions" value={institutionCount} delay={0.06} />
          <StatCard icon={GraduationCap} label="Faculties" value={facultyCount} delay={0.12} />
        </div>

        <div className="border border-line rounded-2xl bg-white shadow-soft overflow-hidden">
          <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-line">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by institution, faculty, or department"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line text-sm focus:border-ink transition-colors"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-line text-sm focus:border-ink transition-colors"
            >
              <option value="all">All responses</option>
              <option value="experienced">Experienced behaviour</option>
              <option value="reported">Reported</option>
              <option value="not-reported">Not reported</option>
            </select>
            <button
              onClick={() => downloadCSV(filtered)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-ink text-white text-sm hover:bg-accent transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-400 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Institution</th>
                  <th className="px-5 py-3 font-medium">Faculty</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Level</th>
                  <th className="px-5 py-3 font-medium">Experienced</th>
                  <th className="px-5 py-3 font-medium">Reported</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-line hover:bg-panel/60 transition-colors">
                    <td className="px-5 py-3.5">{r.institution}</td>
                    <td className="px-5 py-3.5">{r.faculty}</td>
                    <td className="px-5 py-3.5">{r.department}</td>
                    <td className="px-5 py-3.5">{r.level}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs border ${
                          r.experienced === 'Yes'
                            ? 'border-accent/30 text-accent bg-accent/5'
                            : 'border-line text-neutral-500'
                        }`}
                      >
                        {r.experienced}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-600">{r.reported}</td>
                    <td className="px-5 py-3.5 text-neutral-500">{r.date}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-neutral-400 text-sm">
                      No responses match your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mt-6">
          This dashboard displays sample data for demonstration purposes only. No authentication,
          backend, or live data source is connected.
        </p>
      </main>
    </div>
  )
}
