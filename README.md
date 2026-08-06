# SafeVoice

A frontend-only academic research platform where female students can voluntarily and
confidentially share experiences of inappropriate behaviour, abuse of authority, or harassment
involving lecturers.

This is a prototype for **academic research purposes only** it is not a legal reporting
platform or emergency service, and it has no backend, database, or authentication.

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod (schema validation)
- react-hot-toast (notifications)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     Reusable UI pieces (Navbar, Footer, Button, FeatureCard, ProgressBar, Seal, Modal, Spinner)
  lib/
    formspree.js  Shared submit helper — both Survey and Contact post here
  pages/          One file per page
  App.jsx         Simple state-based page routing (no router library needed)
  main.jsx        React entry point
  index.css       Tailwind directives + accessibility/reduced-motion rules
```

## Pages

| Page | Route key | Notes |
|---|---|---|
| Home | `home` | Hero, feature cards, "How it works" 4-step section |
| About the Research | `about` | Purpose, participants, confidentiality, time |
| Consent Form | `consent` | Checkbox gate before survey access |
| Research Survey | `survey` | 6-step form, Zod validation, anonymous toggle, confirm modal |
| Thank You | `thankyou` | Confirmation + return-home |
| FAQ | `faq` | Accordion of common questions |
| Privacy Policy | `privacy` | Confidentiality & data-use explanation |
| Contact | `contact` | Simple contact form submitting to Formspree |
| Admin Dashboard | `admin` | Sidebar, stat cards, searchable/filterable table, CSV export (mock data, UI only) |

A small "Admin demo" button floats in the bottom-right corner of every public page to reach the
dashboard — remove it whenever you wire up real authentication.

## Survey fields

Step 1 (required): institution, faculty, department, level, age range, gender
Step 2 (optional): anonymous toggle, full name, matric number — checking "anonymous" clears and
disables the name/matric fields
Step 3 (optional, intentionally not required — see note below): lecturer's name, department, faculty
Step 4: experience type, location, academic session, reporting status
Step 5: effects, recommendations, additional comments
Step 6 (optional): follow-up contact name/email/phone

**On the lecturer fields:** these are optional by design, not required. A required field naming a
real person — submitted by someone who can stay fully anonymous, with no institutional review — is
a different risk category from anonymous research data (defamation exposure, no due process, no
verification). If the client needs mandatory perpetrator identification for the research to be
valid, that should go through her institution's ethics board and legal counsel first, with data
security beyond a free-tier form service.

On final submit, a confirmation modal summarizes what's about to be sent and flags if any
identifying information was included.

## Notes

- The Admin Dashboard uses hardcoded sample data in `src/pages/AdminDashboard.jsx` — replace
  `MOCK_RESPONSES` with real data once you have a way to pull real submissions in.
- "Export CSV" works client-side today (downloads whatever mock rows are currently filtered).

## Receiving real responses (survey → client's inbox)

The survey now submits to [Formspree](https://formspree.io) so responses actually reach the
client, without needing a backend server:

1. Create a free Formspree account at formspree.io.
2. Create a new form (name it something like "SafeVoice").
3. Formspree gives you an endpoint that looks like `https://formspree.io/f/xxxxxxxx`.
4. Open `src/pages/Survey.jsx`, find this line near the top of the `Survey` component:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
   and replace `YOUR_FORM_ID` with the client's real form ID.
5. Rebuild and redeploy (see below).

From then on, every completed survey emails the client directly, and she can also view all
submissions in a table on the Formspree dashboard. The free plan allows 50 submissions/month —
upgrade if she expects more responses, or if she wants exports/spam filtering.

**A note on sensitivity:** this is survey content about harassment, so it's worth telling the
client plainly — emailed submissions land in a normal inbox and on Formspree's dashboard, not in
an end-to-end-encrypted system. That's fine for a lot of academic research, but if her ethics
approval requires stronger data protection, a proper backend with restricted access (like the
MongoDB version of this project) is the safer route rather than email.

## Deploying the site (Vercel, free)

1. Push this project to a GitHub repository (create one if you don't have it yet):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click "Add New… → Project" and import the repository.
4. Vercel auto-detects Vite — leave the defaults (Build command: `npm run build`,
   Output directory: `dist`) and click **Deploy**.
5. In a minute or two you'll get a live URL like `safevoice.vercel.app`.
6. To hand it over to the client: either transfer the Vercel project to her account, or add her
   email as a collaborator on the project under Project Settings → Members, and add her as a
   collaborator on the GitHub repo too if she'll need to make changes later.
7. Optional: connect a custom domain under Project Settings → Domains if she has one.

Any time you push a code change (e.g. after adding the real Formspree ID) to the `main` branch,
Vercel redeploys automatically — no extra steps needed.
