import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '../components/Button.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Modal from '../components/Modal.jsx'
import Spinner from '../components/Spinner.jsx'
import { submitToFormspree } from '../lib/formspree.js'

const LEVELS = ['100', '200', '300', '400', '500',]
const AGE_RANGES = ['Under 18', '18–20', '21–23', '24–26', '27 and above']
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']
const YES_NO_PREFER = ['Yes', 'No', 'Prefer not to say']
const EXPERIENCE_TYPES = [
  'Harassment',
  'Sexual harassment',
  'Abuse of authority',
  'Threats',
  'Intimidation',
  'Academic exploitation',
  'Other',
]

const schema = z.object({
  institution: z.string().min(1, 'Please enter your institution'),
  faculty: z.string().min(1, 'Please enter your faculty'),
  department: z.string().min(1, 'Please enter your department'),
  level: z.string().min(1, 'Please select your level'),
  ageRange: z.string().min(1, 'Please select your age range'),
  gender: z.string().min(1, 'Please select your gender'),
  fullName: z.string().optional(),
  matricNumber: z.string().optional(),
  lecturerName: z.string().optional(),
  lecturerDepartment: z.string().optional(),
  lecturerFaculty: z.string().optional(),
  experienced: z.string().min(1, 'Please select an option'),
  experienceType: z.array(z.string()).optional(),
  location: z.string().optional(),
  academicSession: z.string().optional(),
  reported: z.string().optional(),
  reasonNotReported: z.string().optional(),
  effects: z.string().optional(),
  recommendations: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z
    .string()
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email address'),
  contactPhone: z.string().optional(),
})

const STEP_FIELDS = [
  ['institution', 'faculty', 'department', 'level', 'ageRange', 'gender'],
  ['anonymous', 'fullName', 'matricNumber'],
  ['lecturerName', 'lecturerDepartment', 'lecturerFaculty'],
  ['experienced', 'experienceType', 'location', 'academicSession', 'reported', 'reasonNotReported'],
  ['effects', 'recommendations', 'additionalComments'],
  ['contactName', 'contactEmail', 'contactPhone'],
]

const STEP_TITLES = [
  'Institution details',
  'About you',
  'Lecturer involved',
  'The incident',
  'Impact & suggestions',
  'Follow-up contact',
]

function Field({ label, error, children, required, hint }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-neutral-400 font-normal">(required)</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-ink transition-colors disabled:bg-panel disabled:text-neutral-400'

export default function Survey({ navigate }) {
  const [step, setStep] = useState(1)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const totalSteps = STEP_FIELDS.length

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { experienceType: [] },
  })

  const experienced = watch('experienced')
  const reported = watch('reported')
  const anonymous = watch('anonymous')

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step - 1])
    if (valid) setStep((s) => Math.min(s + 1, totalSteps))
  }

  const prev = () => setStep((s) => Math.max(s - 1, 1))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      if (step < totalSteps) {
        e.preventDefault()
        next()
      }
    }
  }

  const onAnonymousChange = (checked) => {
    setValue('anonymous', checked)
    if (checked) {
      setValue('fullName', '')
      setValue('matricNumber', '')
    }
  }

  const onSubmit = async (data) => {
    try {
      await submitToFormspree({
        _subject: 'SafeVoice Research — New Submission',
        form: 'research-survey',
        ...data,
      })
      toast.success('Response submitted. Thank you.')
      navigate('thankyou')
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.')
    } finally {
      setConfirmOpen(false)
    }
  }

  const openConfirm = async () => {
    const valid = await trigger(STEP_FIELDS[step - 1])
    if (valid) setConfirmOpen(true)
  }

  const variants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">Report</p>
      <h1 className="font-display text-3xl font-medium tracking-tight mb-1">
        {STEP_TITLES[step - 1]}
      </h1>
      <p className="text-sm text-neutral-500 mb-8">Tell us about your experience, at your own pace.</p>

      <ProgressBar step={step} totalSteps={totalSteps} />

      <form onKeyDown={handleKeyDown}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <Field label="Institution name" required error={errors.institution?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Modibbo Adama University"
                    {...register('institution')}
                  />
                </Field>
                <Field label="Faculty" required error={errors.faculty?.message}>
                  <input className={inputClass} placeholder="e.g. Science" {...register('faculty')} />
                </Field>
                <Field label="Department" required error={errors.department?.message}>
                  <input
                    className={inputClass}
                    placeholder="e.g. Computer Science"
                    {...register('department')}
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Level" required error={errors.level?.message}>
                    <select className={inputClass} defaultValue="" {...register('level')}>
                      <option value="" disabled>Select level</option>
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Age range" required error={errors.ageRange?.message}>
                    <select className={inputClass} defaultValue="" {...register('ageRange')}>
                      <option value="" disabled>Select age range</option>
                      {AGE_RANGES.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Gender" required error={errors.gender?.message}>
                  <select className={inputClass} defaultValue="" {...register('gender')}>
                    <option value="" disabled>Select gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <label className="flex items-start gap-3 border border-line rounded-xl px-4 py-3.5 cursor-pointer bg-panel">
                  <input
                    type="checkbox"
                    checked={!!anonymous}
                    onChange={(e) => onAnonymousChange(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-sm">
                    I prefer not to report it anymore.
                    <span className="block text-xs text-neutral-500 mt-0.5">
                      This clears and disables the name/matric fields below.
                    </span>
                  </span>
                </label>

                <Field label="Your full name">
                  <input
                    className={inputClass}
                    placeholder="Optional — leave blank to stay anonymous"
                    disabled={anonymous}
                    {...register('fullName')}
                  />
                </Field>
                <Field label="Your matric number">
                  <input
                    className={inputClass}
                    placeholder="Optional"
                    disabled={anonymous}
                    {...register('matricNumber')}
                  />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <div className="border border-line rounded-xl px-4 py-3.5 bg-panel text-xs text-neutral-600 leading-relaxed">
                  These fields are optional. Naming someone make this response into an
                  identifiable allegation rather than to be quite about it you can only fill this in if
                  you're certain and comfortable doing so.
                </div>
                <Field label="Lecturer's full name">
                  <input className={inputClass} placeholder="Optional" {...register('lecturerName')} />
                </Field>
                <Field label="Lecturer's department">
                  <input
                    className={inputClass}
                    placeholder="Optional"
                    {...register('lecturerDepartment')}
                  />
                </Field>
                <Field label="Lecturer's faculty">
                  <input
                    className={inputClass}
                    placeholder="Optional"
                    {...register('lecturerFaculty')}
                  />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field
                  label="Have you personally experienced inappropriate behaviour from this lecturer?"
                  required
                  error={errors.experienced?.message}
                >
                  <div className="flex flex-col gap-2.5 mt-1">
                    {YES_NO_PREFER.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 border border-line rounded-xl px-4 py-3 cursor-pointer has-[:checked]:border-ink text-sm"
                      >
                        <input
                          type="radio"
                          value={opt}
                          className="w-4 h-4 text-accent focus:ring-accent"
                          {...register('experienced')}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>

                {experienced === 'Yes' && (
                  <>
                    <Field label="Type of experience">
                      <div className="grid sm:grid-cols-2 gap-2.5 mt-1">
                        {EXPERIENCE_TYPES.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-3 border border-line rounded-xl px-4 py-3 cursor-pointer has-[:checked]:border-ink text-sm"
                          >
                            <input
                              type="checkbox"
                              value={opt}
                              className="w-4 h-4 rounded text-accent focus:ring-accent"
                              {...register('experienceType')}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Field label="Location">
                        <input
                          className={inputClass}
                          placeholder="e.g. Office, classroom, off-campus"
                          {...register('location')}
                        />
                      </Field>
                      <Field label="Academic session">
                        <input
                          className={inputClass}
                          placeholder="e.g. 2023/2024"
                          {...register('academicSession')}
                        />
                      </Field>
                    </div>

                    <Field label="Did you report the incident?">
                      <div className="flex flex-col gap-2.5 mt-1">
                        {YES_NO_PREFER.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-3 border border-line rounded-xl px-4 py-3 cursor-pointer has-[:checked]:border-ink text-sm"
                          >
                            <input
                              type="radio"
                              value={opt}
                              className="w-4 h-4 text-accent focus:ring-accent"
                              {...register('reported')}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </Field>

                    {reported === 'No' && (
                      <Field label="Why didn't you report it?">
                        <textarea
                          rows={4}
                          className={inputClass}
                          placeholder="Share what held you back, if you're comfortable"
                          {...register('reasonNotReported')}
                        />
                      </Field>
                    )}
                  </>
                )}
              </>
            )}

            {step === 5 && (
              <>
                <Field label="Effects on your academic performance or wellbeing">
                  <textarea
                    rows={4}
                    className={inputClass}
                    placeholder="Optional"
                    {...register('effects')}
                  />
                </Field>
                <Field label="Recommendations">
                  <textarea
                    rows={4}
                    className={inputClass}
                    placeholder="What could institutions do differently?"
                    {...register('recommendations')}
                  />
                </Field>
                <Field label="Additional comments">
                  <textarea
                    rows={3}
                    className={inputClass}
                    placeholder="Optional"
                    {...register('additionalComments')}
                  />
                </Field>
              </>
            )}

            {step === 6 && (
              <>
                <p className="text-sm text-neutral-600 leading-relaxed border border-line rounded-xl px-4 py-4 bg-panel">
                  If you're willing to take part in any follow-up Student safety, you may
                  provide your contact information below. All fields are optional.
                </p>
                <Field label="Name">
                  <input className={inputClass} placeholder="Optional" {...register('contactName')} />
                </Field>
                <Field label="Email" error={errors.contactEmail?.message}>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="Optional"
                    {...register('contactEmail')}
                  />
                </Field>
                <Field label="Phone number">
                  <input className={inputClass} placeholder="Optional" {...register('contactPhone')} />
                </Field>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={prev} disabled={step === 1}>
            Previous
          </Button>

          {step < totalSteps ? (
            <Button type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={openConfirm}>
              Review & submit
            </Button>
          )}
        </div>
      </form>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm your submission"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)} className="flex-1">
              Go back
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="w-4 h-4" /> Submitting…
                </>
              ) : (
                'Submit response'
              )}
            </Button>
          </>
        }
      >
        <p>
          Your response will be sent directly to the research team and cannot be edited
          afterward.
        </p>
        {(watch('lecturerName') || watch('fullName')) && (
          <p className="mt-3 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs">
            You've included identifying information{watch('lecturerName') ? ' — including a lecturer\'s name' : ''}.
            Please make sure you're comfortable with that before continuing.
          </p>
        )}
      </Modal>
    </div>
  )
}
