import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-8 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-5xl">This page drifted off.</h1>
      <p className="mt-5 text-mute">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link className="mt-10 rounded-full bg-inv-bg px-7 py-3.5 text-sm font-medium text-inv-fg" href="/">Back to home</Link>
    </main>
  )
}
