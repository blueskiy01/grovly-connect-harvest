import { Share, Leaf, Handshake } from 'lucide-react';
import Navigation from '../components/Navigation';
import Hero from '../components/how-it-works/Hero';
import CallToAction from '../components/how-it-works/CallToAction';
import harvest from '@/media/harvest.png'
import mushroom from '@/media/mushroom.png'
import food_table from '@/media/food_table.png'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Share className="w-12 h-12 text-primary" />,
      title: "Share or Search for What You Need",
      description: [
        'Consumers: Share your interest in specific produce (e.g., "I\'d like locally grown bok choy").',
        "Farmers: List current crops, future harvests, or available space for planting.",
        "Businesses: Share reusable byproducts (e.g., coffee grounds for mushroom farming)."
      ],
      image: mushroom,
      imagePosition: 'right'
    },
    {
      icon: <Handshake className="w-12 h-12 text-primary" />,
      title: "Connect and Collaborate",
      description: [
        "Farmers see real demand from consumers and can plan their crops accordingly.",
        'Example: "20 people want bok choy this season? Let\'s plant it!"',
        "Consumers can browse available listings, express interest, or pre-order produce.",
        "Businesses connect with farmers to share resources (like compost or waste materials)."
      ],
      image: food_table,
      imagePosition: 'left'
    },
    {
      icon: <Leaf className="w-12 h-12 text-primary" />,
      title: "Grow, Share, and Buy Locally",
      description: [
        "Farmers grow crops knowing there's demand, reducing waste and increasing profitability.",
        "Consumers receive fresh, local produce and support sustainable farming.",
        "Businesses and farmers close the loop by reusing resources, contributing to a circular economy."
      ],
      image: harvest,
      imagePosition: 'right'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              step.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block p-4 bg-cream-dark rounded-2xl">
                {step.icon}
              </div>
              <h2 className="text-3xl font-bold text-charcoal">{step.title}</h2>
              <ul className="space-y-4">
                {step.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 text-primary flex-shrink-0 mt-1">➔</span>
                    <span className="text-charcoal-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <img
                src={step.image}
                alt={`Step illustration: ${step.title}`}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      <CallToAction />
    </div>
  );
};

export default HowItWorks;