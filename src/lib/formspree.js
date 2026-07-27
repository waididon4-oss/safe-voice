export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykrlnpd'

/**
 * Submits a JSON payload directly to Formspree. No backend involved.
 * Throws a readable Error on failure so callers can show a toast/message.
 */
export async function submitToFormspree(payload) {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let message = 'Submission failed. Please check your connection and try again.'
    try {
      const data = await res.json()
      if (data?.errors?.length) {
        message = data.errors.map((e) => e.message).join(', ')
      }
    } catch {
      // ignore parse errors, use default message
    }
    throw new Error(message)
  }

  return res.json().catch(() => ({}))
}
