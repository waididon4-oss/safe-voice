import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import Seal from '../components/Seal.jsx'

export default function ThankYou({ navigate }) {
  return (
    <div className="max-w-xl mx-auto px-5 sm:px-8 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-16 h-16 mx-auto mb-8 rounded-full border border-line flex items-center justify-center"
      >
        <Seal className="w-9 h-9" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display text-3xl font-medium tracking-tight"
      >
        Thank you for sharing your voice.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-4 text-neutral-600 leading-relaxed"
      >
        Your response has been recorded anonymously and will contribute to a better
        understanding of student experiences on campus. This research would not be possible
        without participants like you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26 }}
        className="mt-9"
      >
        <Button onClick={() => navigate('home')}>Return to home</Button>
      </motion.div>
    </div>
  )
}
