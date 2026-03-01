import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-dark-900/70 backdrop-blur-xl border-b border-primary-500/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-black text-2xl bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">RidefleetAZ</Link>
        <nav className="flex items-center gap-6">
          <Link href="/how-it-works" className="text-sm text-gray-300 hover:text-primary-400 transition">How it works</Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-primary-400 transition">About</Link>
          <Link href="/apply"><button className="bg-gradient-blue text-white px-6 py-2 rounded-xl text-sm font-semibold hover:shadow-glow transition">Apply Now</button></Link>
        </nav>
      </div>
    </header>
  )
}
