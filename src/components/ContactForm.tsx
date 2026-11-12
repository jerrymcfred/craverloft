'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitInquiry, type InquiryState } from '@/app/(frontend)/actions'
import { budgetOptions, serviceOptions } from '@/collections/Inquiries'
import { Icon } from './ui'

const initial: InquiryState = { status: 'idle' }

const field = 'peer w-full rounded-2xl border border-line bg-glass px-4 pb-2.5 pt-6 text-[15px] outline-none transition-[border-color,box-shadow] placeholder-transparent focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)]'
const label = 'pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-mute transition-all duration-200 peer-focus:top-2 peer-focus:scale-75 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75'

export default function ContactForm({ defaultService = 'not-sure' }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => { if (state.status === 'success') formRef.current?.reset() }, [state.status])

  if (state.status === 'success') {
    return (
      <div className="glass grid min-h-[420px] place-items-center rounded-[32px] p-10 text-center" role="status">
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent"><Icon name="check" size={28} /></span>
          <h3 className="mt-8 text-3xl">Thank you. We&apos;ve got it.</h3>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-mute">Your enquiry is with the team. A senior member of Craverloft will reply within one working day.</p>
        </div>
      </div>
    )
  }

  const err = (k: keyof NonNullable<InquiryState['errors']>) => state.errors?.[k]

  return (
    <form ref={formRef} action={action} noValidate className="glass grid gap-4 rounded-[32px] p-5 sm:p-8">
      {/* honeypot, hidden from people */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" placeholder="Name" required maxLength={120} autoComplete="name" className={field} aria-invalid={!!err('name')} />
          <label htmlFor="name" className={label}>Your name</label>
          {err('name') && <p className="mt-1.5 pl-1 text-xs text-accent2">{err('name')}</p>}
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" placeholder="Email" required autoComplete="email" className={field} aria-invalid={!!err('email')} />
          <label htmlFor="email" className={label}>Work email</label>
          {err('email') && <p className="mt-1.5 pl-1 text-xs text-accent2">{err('email')}</p>}
        </div>
      </div>

      <div className="relative">
        <input id="company" name="company" placeholder="Company" maxLength={160} autoComplete="organization" className={field} />
        <label htmlFor="company" className={label}>Company (optional)</label>
      </div>

      <fieldset className="grid gap-2">
        <legend className="eyebrow mb-2">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name="service" value={o.value} defaultChecked={o.value === defaultService} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-glass px-4 py-2 text-[13px] text-soft transition-all hover:border-accent/50 peer-checked:border-transparent peer-checked:bg-inv-bg peer-checked:text-inv-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent">{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="eyebrow mb-2">Budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name="budget" value={o.value} defaultChecked={o.value === 'tbd'} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-glass px-4 py-2 text-[13px] text-soft transition-all hover:border-accent/50 peer-checked:border-transparent peer-checked:bg-inv-bg peer-checked:text-inv-fg peer-focus-visible:ring-2 peer-focus-visible:ring-accent">{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea id="message" name="message" placeholder="Message" rows={5} required maxLength={4000} className={`${field} resize-y`} aria-invalid={!!err('message')} />
        <label htmlFor="message" className={label}>Tell us about the project</label>
        {err('message') && <p className="mt-1.5 pl-1 text-xs text-accent2">{err('message')}</p>}
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="max-w-xs text-xs leading-relaxed text-mute" aria-live="polite">
          {state.status === 'error' ? <span className="text-accent2">{state.message}</span> : 'Your details go straight to our team and are never shared.'}
        </p>
        <button disabled={pending} className="group inline-flex items-center gap-3 rounded-full bg-inv-bg px-7 py-4 text-sm font-medium text-inv-fg transition-all hover:scale-[1.03] disabled:opacity-60">
          {pending ? 'Sending...' : 'Send enquiry'}
          <Icon name="arrow" size={17} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
