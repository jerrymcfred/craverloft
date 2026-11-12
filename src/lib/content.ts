export type IconName = 'pen' | 'web' | 'code' | 'building' | 'arrow' | 'spark' | 'cube' | 'search' | 'sun' | 'moon' | 'home' | 'grid' | 'mail' | 'user' | 'layers' | 'check'

export type Service = {
  slug: string
  num: string
  title: string
  short: string
  description: string
  icon: IconName
  tags: string[]
  deliverables: string[]
  stack: string[]
}

export const services: Service[] = [
  {
    slug: 'interactive-design',
    num: '01',
    title: 'Interactive UI/UX design',
    short: 'Interactive design',
    description: 'Product experiences that feel clear, fluid and unmistakably yours, from first research session to production-ready design systems.',
    icon: 'pen',
    tags: ['Product strategy', 'UX research', 'Design systems'],
    deliverables: ['User research and experience strategy', 'Interface and interaction design', 'Interactive prototypes and usability testing', 'Scalable design systems and documentation'],
    stack: ['Figma', 'Framer', 'Rive', 'Lottie', 'Storybook'],
  },
  {
    slug: 'web-design-development',
    num: '02',
    title: 'Web design & development',
    short: 'Web platforms',
    description: 'High-performance sites and digital platforms designed to build momentum, and engineered to scale with the business.',
    icon: 'web',
    tags: ['Digital strategy', 'Creative development', 'Motion'],
    deliverables: ['Digital positioning and content architecture', 'Responsive design for every screen', 'Creative front-end engineering and motion', 'Performance, SEO and conversion optimisation'],
    stack: ['Next.js', 'React', 'TypeScript', 'WebGL', 'Tailwind'],
  },
  {
    slug: 'custom-web-development',
    num: '03',
    title: 'Custom web development',
    short: 'Custom software',
    description: 'Purpose-built applications, platforms and integrations, engineered around the exact shape of your business.',
    icon: 'code',
    tags: ['Web applications', 'APIs', 'Cloud'],
    deliverables: ['Full-stack application development', 'API design and systems integration', 'Cloud architecture and DevOps', 'Quality assurance, monitoring and support'],
    stack: ['Node', 'Postgres', 'GraphQL', 'AWS', 'Docker'],
  },
  {
    slug: 'enterprise-software',
    num: '04',
    title: 'Custom enterprise software',
    short: 'Enterprise systems',
    description: 'Secure, intelligent systems for ambitious organisations, across applied AI, blockchain, finance and industrial technology.',
    icon: 'building',
    tags: ['Applied AI', 'Blockchain', 'Fintech'],
    deliverables: ['Enterprise product strategy and architecture', 'AI-enabled workflow automation', 'Blockchain and fintech platforms', 'Legacy modernisation and integration'],
    stack: ['Python', 'PyTorch', 'Solidity', 'Kafka', 'Kubernetes'],
  },
]

export const processSteps = [
  { title: 'Discovery & Research', text: 'Understanding the business, users, challenges and objectives.', detail: 'Stakeholder interviews, user research, market and technical audits. We leave with a shared definition of the problem and what success looks like.' },
  { title: 'Strategy & Architecture', text: 'Defining the solution, technical architecture and product direction.', detail: 'Product roadmap, system architecture and a prioritised plan. Every decision is tied back to a measurable business outcome.' },
  { title: 'Design & Prototyping', text: 'Translating ideas into intuitive interfaces and interactive prototypes.', detail: 'Information architecture, interface design and clickable prototypes tested with real users before a line of production code.' },
  { title: 'Engineering & Development', text: 'Building, integrating and testing the software.', detail: 'Two-week increments, continuous integration and automated testing. You see working software at every stage, not just at the end.' },
  { title: 'Deployment & Optimization', text: 'Launching, measuring and continuously improving the product.', detail: 'Secure release, observability and iteration based on real usage. We stay close after launch to make the product better.' },
]

export const industries = [
  { name: 'Financial services', text: 'Wealth, payments and trading platforms built for trust, speed and regulation.' },
  { name: 'Enterprise & operations', text: 'Decision systems and workflow software for complex, global organisations.' },
  { name: 'Industrial & manufacturing', text: 'Connected operations, predictive maintenance and plant intelligence.' },
  { name: 'Blockchain & digital assets', text: 'Tokenisation, custody and on-chain products with institutional rigour.' },
  { name: 'Health & life sciences', text: 'Secure, human-centred tools for care teams and research.' },
]

export const principles = [
  { title: 'Senior by default', text: 'Direct access to the people doing the thinking and the making. No hand-offs, no layers.' },
  { title: 'One integrated team', text: 'Strategy, design and engineering working as one, aligned around your outcome.' },
  { title: 'Clarity over theatre', text: 'Straight answers, visible progress and honest trade-offs at every step.' },
  { title: 'Quality that compounds', text: 'Systems designed to grow stronger as your product and business evolve.' },
]

export const techRows = [
  ['Artificial intelligence', 'Machine learning', 'LLM applications', 'Computer vision', 'Data engineering', 'Predictive analytics'],
  ['Blockchain', 'Smart contracts', 'Cloud platforms', 'Industrial IoT', 'Systems integration', 'Mobile products'],
]

export const testimonials = [
  { quote: 'Craverloft turned an ambitious concept into a product our teams genuinely love using. They understood the business as deeply as the technology.', name: 'Amelia Morris', role: 'Chief Product Officer, Meridia' },
  { quote: 'The clearest thinking and the best craft we have worked with. They challenged our assumptions and the product is far better for it.', name: 'Daniel Okafor', role: 'Managing Partner, Northstar Capital' },
  { quote: 'It speaks the language of the factory floor and the boardroom equally well. Delivered on time, and the results speak for themselves.', name: 'Priya Raman', role: 'VP Operations, Foundry Industries' },
]

export const partners = ['Meridia', 'Northstar', 'Axiom', 'Vault', 'Foundry', 'Atlas']
