import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button.jsx'
import Seal from '../components/Seal.jsx'

export default function Consent({ navigate }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Seal className="w-8 h-8" />
          <p className="text-xs uppercase tracking-wide text-neutral-400">Consent form</p>
        </div>

        <h1 className="font-display text-3xl font-medium tracking-tight mb-6">
          Before you begin
        </h1>

        <div className="border border-line rounded-2xl p-7 bg-panel shadow-soft space-y-4 text-[15px] text-neutral-700 leading-relaxed">
          <p>
            You are being invited to take part in the SafeVoice site, an
            academic group research to examining inappropriate behaviour, abuse of authority, and
            harassment by lecturers toward both gender male and female to students in higher institutions.
          </p>
          <p>
            Your participation is your <strong className="text-ink font-medium">wish</strong>.
            You do not have to answer any question you are not comfortable with, and you may
            stop at any time without consequence.
          </p>
          <p>
            No names or identifying details are required. Your responses are{' '}
            <strong className="text-ink font-medium">safe by the group</strong>, and will
            be used solely for academic secure purposes. The report includes a few optional
            fields your name, a way to contact you, and the name of the lecturer involved.
            Filling these in means your response is recorded; and you can only include them if
            you are fully comfortable doing so.
          </p>
          <p className="text-sm text-neutral-500">
            This platform is a legal reporting channel or an emergency service but be sincere with it. If you need
            immediate support, please contact your institution's student affairs office or a
            trusted counsellor.
          </p>
        </div>

        <label className="flex items-start gap-3 mt-7 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-accent focus:ring-accent"
          />
          <span className="text-sm text-neutral-700">
            I have read the information above and I agreed to do so.
          </span>
        </label>

        <div className="mt-8 flex gap-4">
          <Button disabled={!agreed} onClick={() => navigate('survey')}>
            Continue
          </Button>
          <Button variant="ghost" onClick={() => navigate('about')}>
            Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
