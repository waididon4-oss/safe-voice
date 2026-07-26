import { motion } from 'framer-motion'
import { ShieldCheck, HeartHandshake, GraduationCap, ArrowRight, FileText, ClipboardCheck, Send, Sparkles } from 'lucide-react'
import Button from '../components/Button.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import Seal from '../components/Seal.jsx'

const STEPS = [
  { icon: FileText, title: 'Read the consent information', description: 'Understand what participation means before you begin.' },
  { icon: ClipboardCheck, title: 'Complete the survey', description: 'Answer at your own pace across a few short steps.' },
  { icon: Send, title: 'Submit confidentially', description: 'Your response goes straight to the research team.' },
  { icon: Sparkles, title: 'Help improve future educational environments', description: 'Your voice contributes to real, evidence-based change.' },
]

export default function Home({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 text-xs text-neutral-500 border border-line rounded-full w-fit px-3 py-1.5"
          >
            <Seal className="w-4 h-4" />
            Academic research · Confidential · Voluntary
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl leading-[1.15] font-medium tracking-tight"
          >
            SafeVoice
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-neutral-600 text-base leading-relaxed max-w-xl"
          >
            A confidential academic research initiative designed to understand and improve the
            experiences of female students in higher institutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button onClick={() => navigate('consent')} className="group">
              Start Research Survey
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="secondary" onClick={() => navigate('about')}>
              Learn More
            </Button>
          </motion.div>

          <p className="mt-5 text-xs text-neutral-400">
            Is a ilegal reporting platform or emergency service for academic research only.
          </p>
        </div>
      </section>

      {/* Explanation */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 border-t border-line">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <h2 className="font-display text-2xl font-medium">Why this research exists</h2>
          </div>
          <div className="md:col-span-2 text-neutral-600 leading-relaxed text-[15px] space-y-4">
            <p>
              Many students who experience inappropriate conduct from lecturers never speak
              about it. This study exists to understand how common these experiences are, how
              they affect students, and why many go unreported so that institutions can
              respond with better, evidence-based policy.
            </p>
            <p>
              Participation is entirely voluntary, every response is important, and you may
              stop at any point. No identifying information is required to take part.
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 border-t border-line">
        <div className="grid sm:grid-cols-3 gap-6">
          <FeatureCard
            icon={ShieldCheck}
            title="Confidential Participation"
            description="No names, no identifying details required. Responses are anonymised and handled securely."
            delay={0}
          />
          <FeatureCard
            icon={GraduationCap}
            title="Academic Research"
            description="Findings are used solely for scholarly study to inform institutional policy and awareness."
            delay={0.08}
          />
          <FeatureCard
            icon={HeartHandshake}
            title="Anonymous Submission Available"
            description="Choose to submit fully anonymously, or optionally share contact details for follow-up."
            delay={0.16}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 border-t border-line">
        <h2 className="font-display text-2xl font-medium mb-10">How it works</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-panel border border-line flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-accent" strokeWidth={1.6} />
                </div>
                <span className="text-xs text-neutral-400 font-medium">Step {i + 1}</span>
              </div>
              <h3 className="text-sm font-medium mb-1.5">{s.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
