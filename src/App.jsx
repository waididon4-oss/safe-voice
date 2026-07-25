import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Consent from './pages/Consent.jsx'
import Survey from './pages/Survey.jsx'
import ThankYou from './pages/ThankYou.jsx'
import FAQ from './pages/FAQ.jsx'
import Privacy from './pages/Privacy.jsx'
import Contact from './pages/Contact.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const PAGES = {
  home: Home,
  about: About,
  consent: Consent,
  survey: Survey,
  thankyou: ThankYou,
  faq: FAQ,
  privacy: Privacy,
  contact: Contact,
  admin: AdminDashboard,
}

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (next) => {
    if (!PAGES[next]) return
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  const Page = PAGES[page] || Home
  const isAdmin = page === 'admin'

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Navbar current={page} navigate={navigate} />

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Page navigate={navigate} />
          </motion.div>
        </AnimatePresence>
      </div>

      {!isAdmin && <Footer navigate={navigate} />}

      {/* Discreet dev-only link to the admin dashboard demo */}
      {!isAdmin && (
        <button
          onClick={() => navigate('admin')}
          className="fixed bottom-4 right-4 text-[11px] text-neutral-400 hover:text-neutral-600 bg-white border border-line rounded-full px-3 py-1.5 shadow-soft"
        >
          Admin demo
        </button>
      )}
    </div>
  )
}
