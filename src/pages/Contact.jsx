import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Button from '../components/Button.jsx'
import Spinner from '../components/Spinner.jsx'
import { submitToFormspree } from '../lib/formspree.js'

const schema = z.object({
  fullName: z.string().min(1, 'Please enter your name'),
  email: z.string().min(1, 'Please enter your email').email('Enter a valid email address'),
  subject: z.string().min(1, 'Please enter a subject'),
  message: z.string().min(1, 'Please enter a message'),
})

const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-ink transition-colors'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await submitToFormspree({
        _subject: `SafeVoice Contact — ${data.subject}`,
        form: 'contact',
        ...data,
      })
      toast.success('Message sent. Thank you.')
      setSent(true)
      reset()
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs uppercase tracking-wide text-neutral-400 mb-3">Contact</p>
        <h1 className="font-display text-3xl font-medium tracking-tight mb-4">Get in touch</h1>
        <p className="text-neutral-600 leading-relaxed mb-10">
          Questions about the research, the platform, or how your data is used? Send a message
          and the research team will get back to you.
        </p>

        {sent ? (
          <div className="border border-line rounded-2xl bg-panel p-8 text-center">
            <p className="font-display text-lg font-medium mb-2">Message sent</p>
            <p className="text-sm text-neutral-600">Thanks for reaching out — we'll respond soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full name</label>
              <input className={inputClass} placeholder="Your name" {...register('fullName')} />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input className={inputClass} placeholder="What's this about?" {...register('subject')} />
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-600">{errors.subject.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                className={inputClass}
                placeholder="Your message"
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="w-4 h-4" /> Sending…
                </>
              ) : (
                'Send message'
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
