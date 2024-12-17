import { Link } from 'react-router-dom';
import { Search, Share, Users, Leaf, ArrowRight, HandShake, ShoppingCart } from 'lucide-react';
import Navigation from '../components/Navigation';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Share className="w-12 h-12 text-primary" />,
      title: "Share or Search for What You Need",
      description: [
        "Consumers: Share your interest in specific produce (e.g., 'I\'d like locally grown bok choy').",
        "Farmers: List current crops, future harvests, or available space for planting.",
        "Businesses: Share reusable byproducts (e.g., coffee grounds for mushroom farming)."
      ]
    },
    {
      icon: <HandShake className="w-12 h-12 text-primary" />,
      title: "Connect and Collaborate",
      description: [
        "Farmers see real demand from consumers and can plan their crops accordingly.",
        "Example: '20 people want bok choy this season? Let\'s plant it!'",
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
      
      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
              How Grovly Works
            </h1>
            <p className="text-xl text-charcoal-light max-w-2xl mx-auto">
              Join our community of farmers, consumers, and businesses working together to create a sustainable local food system.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
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
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-charcoal-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <img 
                  src="/placeholder.svg"
                  alt={`Step ${index + 1}: ${step.title}`}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="bg-white p-6 rounded-xl shadow-sm animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                />
                <p className="text-lg italic mb-4">{testimonial.quote}</p>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-charcoal-light">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Start growing smarter and sharing better today.</h2>
          <p className="text-xl mb-8">Let's build a thriving, local food community together!</p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-cream transition-colors"
          >
            Join Grovly Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;