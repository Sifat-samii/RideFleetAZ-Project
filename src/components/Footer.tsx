import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-primary-500/20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-black text-lg bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">RidefleetAZ</h3>
          <p className="text-sm text-gray-400 mt-2">Weekly rentals · Unlimited miles · No credit check</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Company</h4>
          <ul className="text-sm mt-2 space-y-1 text-gray-400">
            <li><Link href="/about" className="hover:text-primary-400 transition">About</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary-400 transition">How it works</Link></li>
            <li><Link href="/contact" className="hover:text-primary-400 transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="text-sm text-gray-400">Phone: (555) 555-0101</p>
          <p className="text-sm text-gray-400">Email: hello@ridefleetaz.com</p>
        </div>
      </div>
      <div className="text-center text-xs py-4 text-gray-500 border-t border-primary-500/20">© {new Date().getFullYear()} RidefleetAZ</div>
    </footer>
  )
}
