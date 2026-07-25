import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Button from '../components/Button.jsx'

const FAQS = [
  {
    q: 'Who can participate?',
    a: 'Any female student currently enrolled in a higher institution may participate, whether or not you have personally experienced inappropriate behaviour from a lecturer.',
  },
  {
    q: 'Is my identity protected?',
    a: 'Yes, by default. The survey does not require your name, matriculation number, or any other identifying information. A few fields — your name, contact details, and a lecturer\'s name — are optional, and only identify you or someone else if you choose to fill them in.',
  },
  {
    q: 'Can I remain anonymous?',
    a: 'Yes. There\'s a specific "I prefer this submission to remain anonymous" option in the survey that clears and disables the identity fields, so you can participate with zero identifying information at all.',
  },
  {
    q: 'How will my information be used?',
    a: 'Responses are analysed for academic research purposes only — to understand patterns and inform institutional policy recommendations. Findings are published in aggregate or anonymised form, never as individual identifiable responses.',
  },
  {
    q: 'Is participation compulsory?',
    a: 'No. Participation is entirely voluntary. You may decline to answer any question, or stop at any point before submitting, without any consequence.',
  },
  {
    q: 'Is this a way to formally report a lecturer?',
    a: 'No. SafeVoice is strictly an academic research platform, not a legal reporting channel or an emergency service. If you wish to make a formal report, please contact your institution\'s appropriate office.',
  },
  {
    q: 'How long does the survey take?',
    a: 'On average, 5 to 10 minutes.',
  },
]

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-line rounded-2xl bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-[15px]">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-neutral-400"
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ({ navigate }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">FAQ</p>
      <h1 className="font-display text-3xl font-medium tracking-tight mb-10">
        Common questions
      </h1>

      <div className="space-y-3">
        {FAQS.map((item, i) => (
          <AccordionItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>

      <div className="mt-12">
        <Button onClick={() => navigate('consent')}>Start the survey</Button>
      </div>
    </div>
  )
}
