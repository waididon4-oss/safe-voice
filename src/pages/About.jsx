import { motion } from 'framer-motion'
import { Target, Users, Lock, Clock } from 'lucide-react'
import Button from '../components/Button.jsx'

const SECTIONS = [
  {
    icon: Target,
    title: 'Purpose of the research',
    body: 'This study examines the prevalence and nature of inappropriate behaviour, abuse of authority, and harassment by lecturers toward female students in higher institutions. The goal is to produce evidence that can inform institutional policy, staff training, and campus safety measures.',
  },
  {
    icon: Users,
    title: 'Who can participate',
    body: 'Any female student currently enrolled in a higher institution may participate, regardless of whether or not you have personally experienced inappropriate behaviour from a lecturer. Your perspective is valuable either way.',
  },
  {
    icon: Lock,
    title: 'Confidentiality',
    body: 'No names, matriculation numbers, or other identifying information are collected. Responses are stored securely and reported only in aggregate or anonymised form. At no point will your individual response be traceable back to you.',
  },
  {
    icon: Clock,
    title: 'Estimated completion time',
    body: 'The survey takes approximately 5–10 minutes to complete. You can move between steps freely before submitting, and nothing is submitted until you reach the final step.',
  },
]

export default function About({ navigate }) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-14"
      >
        <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">About the research</p>
        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
          Understanding student experience, responsibly.
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          This page explains how the study works and what participating actually involves,
          before you're asked to agree to anything.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="border border-line rounded-2xl p-7 bg-white shadow-soft"
          >
            <s.icon className="w-5 h-5 text-accent mb-4" strokeWidth={1.6} />
            <h2 className="font-display text-lg font-medium mb-2">{s.title}</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Button onClick={() => navigate('consent')}>Continue to consent form</Button>
        <Button variant="secondary" onClick={() => navigate('faq')}>
          Read the FAQ
        </Button>
      </div>
    </div>
  )
}
