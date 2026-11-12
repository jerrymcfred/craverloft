import { Hero, Manifesto, Services, Work, Industries, Why, Process, Tech, Testimonials, ContactCTA } from '@/components/home'
import { getProjects, toCard } from '@/lib/projects'

export default async function HomePage() {
  const projects = (await getProjects()).map(toCard)
  return (
    <main>
      <Hero />
      <Manifesto />
      <Services />
      <Work projects={projects} />
      <Industries />
      <Why />
      <Process />
      <Tech />
      <Testimonials />
      <ContactCTA />
    </main>
  )
}
