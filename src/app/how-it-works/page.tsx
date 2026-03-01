import Section from '../../components/Section'
import Button from '../../components/Button'
import Card from '../../components/Card'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Apply Online',
      description: 'Fill out our simple application in minutes. Just provide basic info and upload your driver\'s license.',
      icon: '📝'
    },
    {
      number: '02',
      title: 'Get Approved',
      description: 'No credit check needed. Most applicants are approved within 24 hours. We\'ll contact you directly.',
      icon: '✅'
    },
    {
      number: '03',
      title: 'Pick Your Vehicle',
      description: 'Choose from our fleet of reliable cars and SUVs. All are well-maintained and ready to earn.',
      icon: '🚗'
    },
    {
      number: '04',
      title: 'Start Earning',
      description: 'Hit the road with maintenance, support, and unlimited miles included. Keep 100% of your earnings.',
      icon: '💰'
    }
  ]

  return (
    <>
      <Section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-white mb-4">How It Works</h1>
            <p className="text-xl text-gray-400">Get a reliable vehicle in 4 simple steps</p>
          </div>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-blue shadow-glow">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-black text-primary-400 opacity-50">{step.number}</span>
                    <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  </div>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button as="a" href="/apply" size="lg">Check Your Eligibility</Button>
          </div>
        </div>
      </Section>

      <Section bg="dark-800" className="py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '🔧 Maintenance', desc: 'All repairs and maintenance covered. Just drive.' },
              { title: '∞ Unlimited Miles', desc: 'Drive as much as you need for your gig work.' },
              { title: '📞 24/7 Support', desc: 'Our team is here when you need us.' },
              { title: '🔄 Vehicle Swap', desc: 'Need a different car? We\'re flexible.' }
            ].map((item, i) => (
              <Card key={i} className="bg-dark-700 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-400 mb-8">Our next available intake slot opens soon. Apply now to secure your spot.</p>
          <Button as="a" href="/apply" size="lg">Apply Now</Button>
        </div>
      </Section>
    </>  )
}