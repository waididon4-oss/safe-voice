import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white border border-line rounded-2xl shadow-card max-w-md w-full p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-display text-lg font-medium pr-4">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-neutral-400 hover:text-ink -mt-1 -mr-1 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-neutral-600 leading-relaxed">{children}</div>

            {footer && <div className="mt-6 flex gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
