const COLUMNS = [
  {
    title: 'Research',
    links: [
      { label: 'About the research', page: 'about' },
      { label: 'Start survey', page: 'consent' },
      { label: 'FAQ', page: 'faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', page: 'privacy' },
      { label: 'Contact', page: 'contact' },
    ],
  },
]

export default function Footer({ navigate }) {
  return (
    <footer className="border-t border-line bg-panel mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <p className="font-display text-base font-medium mb-2">SafeVoice</p>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
            An independent academic research study. This platform is a legal reporting
            channel or an emergency service especially for female.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => navigate(l.page)}
                    className="text-sm text-neutral-600 hover:text-ink transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="max-w-6xl mx-auto px-5 sm:px-8 py-5 text-xs text-neutral-400">
          © {new Date().getFullYear()} SafeVoice. For academic purposes only.
        </p>
      </div>
    </footer>
  )
}
