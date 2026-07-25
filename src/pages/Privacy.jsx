import { motion } from 'framer-motion'

const SECTIONS = [
  {
    title: 'Academic purpose',
    body: 'This platform exists solely to support an academic research study into inappropriate behaviour, abuse of authority, and harassment by lecturers toward female students in higher institutions. Data collected is used exclusively for scholarly analysis and reporting.',
  },
  {
    title: 'What we collect',
    body: 'We collect institution, faculty, department, level, and age range for demographic context, along with your responses to the survey questions. A few fields are optional and identifying: your name, a contact method, and the name of the lecturer involved. You decide whether to fill these in.',
  },
  {
    title: 'Confidentiality',
    body: 'By default, no identifying information is collected, so individual responses cannot be traced back to any participant. If you choose to provide your name, contact details, or a lecturer\'s name, that information identifies real people to the research team, and the response is no longer anonymous — this is entirely your choice. Findings are published only in aggregate or anonymised form regardless.',
  },
  {
    title: 'Voluntary participation',
    body: 'Participation is entirely voluntary. You may decline to answer any question or discontinue the survey at any time without any effect on you.',
  },
  {
    title: 'Data use',
    body: 'Data gathered is used only for the purposes of this research study — including analysis, academic publication, and recommendations to institutions. It is not shared with any third party for commercial purposes.',
  },
  {
    title: 'Not a reporting service',
    body: 'This platform is an academic research tool, not a legal reporting channel or an emergency service. If you require immediate support or wish to make a formal complaint, please contact your institution\'s student affairs office, counselling unit, or appropriate authority.',
  },
]

export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">Privacy policy</p>
        <h1 className="font-display text-3xl font-medium tracking-tight mb-4">
          How we protect your privacy
        </h1>
        <p className="text-neutral-600 leading-relaxed mb-10">
          This policy explains, in plain terms, what information this research collects and how
          it is used.
        </p>

        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title} className="border-t border-line pt-6">
              <h2 className="font-display text-lg font-medium mb-2">{s.title}</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
