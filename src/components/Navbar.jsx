import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Seal from './Seal.jsx'

const LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'FAQ', page: 'faq' },
  { label: 'Privacy', page: 'privacy' },
  { label: 'Contact', page: 'contact' },
]

export default function Navbar({ current, navigate }) {
  const [open, setOpen] = useState(false)

  const go = (page) => {
    setOpen(false)
    navigate(page)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 group"
          aria-label="SafeVoice, go to home"
        >
          <Seal className="w-7 h-7" />
          <span className="font-display text-base font-medium tracking-tight">SafeVoice</span>
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`text-sm transition-colors ${
                current === l.page ? 'text-ink font-medium' : 'text-neutral-500 hover:text-ink'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('consent')}
            className="text-sm px-4 py-2 rounded-xl bg-ink text-white hover:bg-accent transition-colors"
          >
            Start Survey
          </button>
        </nav>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-white px-5 py-4 flex flex-col gap-1" aria-label="Mobile">
          {LINKS.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`text-left py-2.5 text-sm ${
                current === l.page ? 'text-ink font-medium' : 'text-neutral-500'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go('consent')}
            className="mt-2 text-sm px-4 py-2.5 rounded-xl bg-ink text-white text-center"
          >
            Start Survey
          </button>
        </nav>
      )}
    </header>
  )
}
