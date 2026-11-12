import type { Metadata } from 'next'
import { ContactCTA } from '@/components/home'

export const metadata: Metadata = { title: 'Contact | Craverloft', description: 'Tell us about your project. A senior member of Craverloft will reply within one working day.' }

export default function ContactPage() {
  return (
    <main className="pt-28">
      <ContactCTA id="form" />
    </main>
  )
}
