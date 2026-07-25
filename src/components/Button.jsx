export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-ink text-white hover:bg-accent shadow-soft hover:shadow-card active:scale-[0.98]',
    secondary:
      'bg-white text-ink border border-line hover:border-ink active:scale-[0.98]',
    ghost: 'text-ink hover:bg-panel',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
