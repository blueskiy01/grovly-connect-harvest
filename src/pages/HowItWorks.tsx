import { Share, Leaf, handshake } from 'lucide-react';
import Navigation from '../components/Navigation';
import Hero from '../components/how-it-works/Hero';
import Step from '../components/how-it-works/Step';
import Testimonial from '../components/how-it-works/Testimonial';
import CallToAction from '../components/how-it-works/CallToAction';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Share className="w-12 h-12 text-primary" />,
      title: "Share or Search for What You Need",
      description: [
        "Consumers: Share your interest in specific produce (e.g., 'I'd like locally grown bok choy').",
        "Farmers: List current crops, future harvests, or available space for planting.",
        "Businesses: Share reusable byproducts (e.g., coffee grounds for mushroom farming)."
      ]
    },
    {
      icon: <handshake className="w-12 h-12 text-primary" />,
      title: "Connect and Collaborate",
      description: [
        "Farmers see real demand from consumers and can plan their crops accordingly.",
        "Example: '20 people want bok choy this season? Let's plant it!'",
        "Consumers can browse available listings, express interest, or pre-order produce.",
        "Businesses connect with farmers to share resources (like compost or waste materials)."
      ]
    },
    {
      icon: <Leaf className="w-12 h-12 text-primary" />,
      title: "Grow, Share, and Buy Locally",
      description: [
        "Farmers grow crops knowing there's demand, reducing waste and increasing profitability.",
        "Consumers receive fresh, local produce and support sustainable farming.",
        "Businesses and farmers close the loop by reusing resources, contributing to a circular economy."
      ]
    }
  ];

  const testimonials = [
    {
      quote: "I shared my interest in bok choy, and now a local farmer grows it just for us!",
      author: "Anna",
      role: "Consumer",
      image: "/placeholder.svg"
    },
    {
      quote: "By seeing demand trends early, I planted garlic and sold out my entire harvest!",
      author: "Marko",
      role: "Farmer",
      image: "/placeholder.svg"
    },
    {
      quote: "We repurpose our coffee grounds for local mushroom farmers, reducing waste and helping the community!",
      author: "Helena",
      role: "Café Owner",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />
      
      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              {...step}
              imagePosition={index % 2 === 1 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={testimonial.author}
                {...testimonial}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>

      <CallToAction />
    </div>
  );
};

export default HowItWorks;