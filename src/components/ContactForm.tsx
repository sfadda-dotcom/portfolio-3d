'use client'

import { useState, FormEvent } from 'react'

type FormStatus = 'idle' | 'sending' | 'sent'

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const subject = encodeURIComponent(`New project inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:meguillin@gmail.com?subject=${subject}&body=${body}`

    setTimeout(() => setStatus('sent'), 500)
  }

  if (status === 'sent') {
    return (
      <div className="py-12">
        <p className="text-lg font-extralight text-white/80">
          Your email client should have opened. Thanks for reaching out.
        </p>
        <button
          onClick={() => { setStatus('idle'); setName(''); setEmail(''); setMessage('') }}
          className="mt-6 text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-3">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-white/[0.12] pb-3 text-sm text-white/90 outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-3">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-white/[0.12] pb-3 text-sm text-white/90 outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-xs tracking-[0.15em] uppercase text-white/35 block mb-3">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent border-b border-white/[0.12] pb-3 text-sm text-white/90 outline-none focus:border-white/40 transition-colors resize-none placeholder:text-white/20"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-8 py-3 text-xs tracking-[0.15em] uppercase border border-white/20 text-white/70 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40"
      >
        {status === 'sending' ? 'Opening...' : 'Send message'}
      </button>
    </form>
  )
}
