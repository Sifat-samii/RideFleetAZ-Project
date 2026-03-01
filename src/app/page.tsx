"use client"
import Link from 'next/link'
import Hero from '../components/Hero'
import Button from '../components/Button'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import Section from '../components/Section'

const vehicles = [
  { id: '1', image: '/images/Daily_drivers.png', title: 'Reliable Daily Drivers', description: 'Perfect for Uber, Lyft, and everyday gig work with excellent fuel efficiency.' },
  { id: '2', image: '/images/SUV.png', title: 'Spacious SUVs', description: 'Great for UberX, Lyft Plus, and larger passenger loads with comfort.' },
  { id: '3', image: '/images/cargo_van.png', title: 'Cargo Vans', description: 'Ideal for DoorDash, Amazon Flex, and delivery with maximum cargo space.' }
]

export default function Home() {
  return (
    <>
      <Hero title="EARN MORE, FASTER" subtitle="Reliable vehicles for Arizona gig drivers — weekly rentals with no credit check" image="/images/hero2.png">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button as={Link} href="/apply" size="lg">Apply Now</Button>
          <Button as={Link} href="/how-it-works" variant="outline" size="lg">How It Works</Button>
        </div>
      </Hero>

      <Section bg="dark-900" className="py-24">
        <h2 className="text-4xl font-black text-center mb-4 text-white">Our Fleet</h2>
        <Carousel items={vehicles} />
      </Section>

      <Section className="py-24">
        <h2 className="text-4xl font-black text-center mb-16 text-white">Why Choose RidefleetAZ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Approval in 24 hours' },
            { icon: '🔒', title: 'No Credit Check', desc: 'Simple, transparent process' },
            { icon: '🔧', title: 'Maintenance Included', desc: 'Stay on the road worry-free' },
            { icon: '∞', title: 'Unlimited Miles', desc: 'Drive as much as you want' }
          ].map((benefit, i) => (
            <div key={i} className="bg-dark-800 border border-primary-500/30 rounded-2xl p-6 hover:border-primary-400 transition">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="dark-800" className="py-24">
        <h2 className="text-4xl font-black text-center mb-16 text-white">What Drivers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Jamal R.', platform: 'Uber', quote: 'Picked up my car in days. Incredible service.' },
            { name: 'Ana L.', platform: 'DoorDash', quote: 'No credit check made it so easy to get started.' },
            { name: 'Chris M.', platform: 'Lyft', quote: 'Reliable cars and fantastic support team.' },
            { name: 'Sofia K.', platform: 'Amazon Flex', quote: 'Best decision for my delivery business.' }
          ].map((testimonial, i) => (
            <Card key={i} className="bg-dark-700 border border-primary-500/20">
              <p className="text-gray-300 italic mb-3">"{testimonial.quote}"</p>
              <div className="text-sm">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-primary-400">{testimonial.platform}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="py-24 text-center">
        <h2 className="text-4xl font-black mb-6 text-white">Ready to Start Earning?</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Join hundreds of Arizona drivers who trust RidefleetAZ for their rental needs.</p>
        <Button as={Link} href="/apply" size="lg">Get Started Today</Button>
      </Section>
    </>
  )
}
