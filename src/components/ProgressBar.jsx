import { motion } from 'framer-motion'

export default function ProgressBar({ step, totalSteps }) {
  const percent = Math.round((step / totalSteps) * 100)

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs text-neutral-500">
          Step {step} of {totalSteps}
        </span>
        <span className="text-xs text-neutral-500">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-panel rounded-full overflow-hidden border border-line">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
