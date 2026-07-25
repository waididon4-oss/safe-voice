// Signature mark: a simple concentric "seal" motif standing in for
// confidentiality — a private mark that only opens for the reader.
export default function Seal({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#1F5C4E" strokeWidth="1" />
      <circle cx="20" cy="20" r="13" stroke="#1F5C4E" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M20 12 L20 20 L25 24" stroke="#1F5C4E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
