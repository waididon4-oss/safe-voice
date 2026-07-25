import { motion } from 'framer-motion'

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-line bg-white p-7 shadow-soft hover:shadow-card transition-shadow duration-300"
    >
      <div className="w-11 h-11 rounded-full bg-panel border border-line flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-accent" strokeWidth={1.6} />
      </div>
      <h3 className="font-display text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}
