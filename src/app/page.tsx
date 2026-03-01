"use client"

import Link from 'next/link'
import Hero from '../components/Hero'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Section from '../components/Section'

const vehicles = [
  { id: '1', image: '/Images/Daily_drivers.png', title: 'Reliable Daily Drivers', description: 'Perfect for Uber, Lyft, and everyday gig work with excellent fuel efficiency.' },
  { id: '2', image: '/Images/SUV.png', title: 'Spacious SUVs', description: 'Great for UberX, Lyft Plus, and larger passenger loads with comfort.' },
  { id: '3', image: '/Images/cargo_van.png', title: 'Cargo Vans', description: 'Ideal for DoorDash, Amazon Flex, and delivery with maximum cargo space.' }
]

export default function Home() {
  return (
    <>
      <Hero title="EARN MORE, FASTER" subtitle="Reliable vehicles for Arizona gig drivers — weekly rentals with no credit check" image="/Images/hero3.png">
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button as={Link} href="/apply" size="lg">Apply Now</Button>
          <Button as={Link} href="/how-it-works" variant="outline" size="lg">How It Works</Button>
        </div>
      </Hero>

      <Section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(12,24,38,0.56)_0%,rgba(5,12,20,0.68)_100%)] py-24 backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(12,24,38,0.5)_0%,rgba(5,12,20,0.6)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.04)]">
        <h2 className="mb-1 text-center text-5xl font-black text-white md:text-6xl">Our Fleet</h2>
        <Carousel items={vehicles} />
      </Section>

      <Section className="py-24">
        <h2 className="mb-16 text-center text-5xl font-black text-white md:text-6xl">Why Choose RidefleetAZ</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Approval in 24 hours' },
            { icon: '🔒', title: 'No Credit Check', desc: 'Simple, transparent process' },
            { icon: '🔧', title: 'Maintenance Included', desc: 'Stay on the road worry-free' },
            { icon: '∞', title: 'Unlimited Miles', desc: 'Drive as much as you want' }
          ].map((benefit) => (
            <div key={benefit.title} className="rounded-2xl border border-primary-500/30 bg-dark-800 p-6 transition hover:border-primary-400">
              <div className="mb-3 text-4xl">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(12,24,38,0.56)_0%,rgba(5,12,20,0.68)_100%)] py-24 backdrop-blur-xl supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(12,24,38,0.5)_0%,rgba(5,12,20,0.6)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.04)]">
        <h2 className="mb-16 text-center text-5xl font-black text-white md:text-6xl">What Drivers Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Jamal R.', platform: 'Uber', quote: 'Picked up my car in days. Incredible service.' },
            { name: 'Ana L.', platform: 'DoorDash', quote: 'No credit check made it so easy to get started.' },
            { name: 'Chris M.', platform: 'Lyft', quote: 'Reliable cars and fantastic support team.' },
            { name: 'Sofia K.', platform: 'Amazon Flex', quote: 'Best decision for my delivery business.' }
          ].map((testimonial) => (
            <Card key={testimonial.name} className="border border-primary-500/20 bg-dark-700">
              <p className="mb-3 italic text-gray-300">"{testimonial.quote}"</p>
              <div className="text-sm">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-primary-400">{testimonial.platform}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="py-24 text-center">
        <h2 className="mb-6 text-4xl font-black text-white">Ready to Start Earning?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">Join hundreds of Arizona drivers who trust RidefleetAZ for their rental needs.</p>
        <Button as={Link} href="/apply" size="lg">Get Started Today</Button>
      </Section>
    </>
  )
}
