import Section from '../../components/Section'
import Button from '../../components/Button'
import Card from '../../components/Card'

export default function About() {
  return (
    <>
      <Section className="py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-6">About RidefleetAZ</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            RidefleetAZ helps Arizona drivers access reliable vehicles quickly with weekly rentals, transparent pricing, and no credit check. Our mission is to keep drivers earning with dependable cars and fast approvals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            {[
              { title: 'Fast Approvals', desc: 'Simple online application with 24-hour turnaround' },
              { title: 'Transparent Pricing', desc: 'Weekly rental terms with no hidden fees' },
              { title: 'Maintenance Included', desc: 'We handle repairs and maintenance — you focus on earning' },
              { title: 'Multi-Platform Ready', desc: 'Works with Uber, Lyft, DoorDash, Amazon Flex, and more' }
            ].map((item, i) => (
              <Card key={i} className="bg-dark-700 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section bg="dark-800" className="py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Why Choose RidefleetAZ?</h2>
          <p className="text-gray-300 text-lg mb-8">
            We understand the challenges Arizona gig drivers face. That's why we've built RidefleetAZ with your needs in mind: fast access to reliable cars, flexible weekly rentals, and a support team that actually cares.
          </p>
          <Button as="a" href="/apply" size="lg">Get Started Today</Button>
        </div>
      </Section>

      <Section className="py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="space-y-6">
            {[
              { icon: '🚗', title: 'Reliability', desc: 'Every vehicle in our fleet is well-maintained and ready to earn.' },
              { icon: '👥', title: 'Driver-Centric', desc: 'We listen to drivers and build solutions that actually work for your life.' },
              { icon: '💰', title: 'Transparent', desc: 'No surprises, no hidden fees. You know exactly what you\'re paying.' },
              { icon: '⚡', title: 'Fast & Simple', desc: 'Approve in 24 hours. Get your car and start earning immediately.' }
            ].map((val, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-4xl">{val.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{val.title}</h3>
                  <p className="text-gray-400">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>  )
}