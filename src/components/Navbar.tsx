import Link from 'next/link'
import Button from './Button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-primary-500/20 bg-dark-900/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-2xl font-black text-transparent">
          RidefleetAZ
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm text-gray-300 transition hover:text-primary-400">How it works</Link>
          <Link href="/about" className="text-sm text-gray-300 transition hover:text-primary-400">About</Link>
          <Button as={Link} href="/apply" size="sm">Apply Now</Button>
        </nav>
      </div>
    </header>
  )
}
