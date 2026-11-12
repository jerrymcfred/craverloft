'use server'

import { getPayloadClient } from '@/lib/payload'
import { budgetOptions, serviceOptions } from '@/collections/Inquiries'

export type InquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'company' | 'message' | 'service' | 'budget', string>>
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const text = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '')

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: bots fill hidden fields. Pretend success so they move on.
  if (text(formData.get('website'))) return { status: 'success' }

  const name = text(formData.get('name'))
  const email = text(formData.get('email')).toLowerCase()
  const company = text(formData.get('company'))
  const message = text(formData.get('message'))
  const service = text(formData.get('service')) || 'not-sure'
  const budget = text(formData.get('budget')) || 'tbd'

  const errors: NonNullable<InquiryState['errors']> = {}
  if (name.length < 2 || name.length > 120) errors.name = 'Please enter your name.'
  if (!emailRe.test(email)) errors.email = 'Please enter a valid email address.'
  if (company.length > 160) errors.company = 'Company name is too long.'
  if (message.length < 10) errors.message = 'Tell us a little more (at least 10 characters).'
  if (message.length > 4000) errors.message = 'Please keep your message under 4,000 characters.'
  if (!serviceOptions.some((o) => o.value === service)) errors.service = 'Choose a service.'
  if (!budgetOptions.some((o) => o.value === budget)) errors.budget = 'Choose a budget range.'

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Please check the highlighted fields.', errors }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'inquiries',
      overrideAccess: false,
      data: {
        name,
        email,
        company: company || undefined,
        message,
        service: service as 'not-sure',
        budget: budget as 'tbd',
      },
    })
    return { status: 'success' }
  } catch (error) {
    console.error('Inquiry submission failed', error)
    return { status: 'error', message: 'Something went wrong on our side. Please try again in a moment.' }
  }
}
