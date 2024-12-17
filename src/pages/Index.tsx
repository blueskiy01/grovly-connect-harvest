import { Link } from 'react-router-dom';
import { Leaf, Users, Recycle, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';

const Index = () => {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "For Farmers",
      description: "List surplus produce and track local demand to minimize waste and maximize profits.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "For Consumers",
      description: "Access fresh, local produce directly from farmers while supporting sustainable practices.",
    },
    {
      icon: <Recycle className="w-8 h-8 text-primary" />,
      title: "For Businesses",
      description: "Share reusable resources and contribute to a circular local economy.",
    },
  ];

  const steps = [
    {
      title: "List or search for produce and resources",
      description: "Post your available produce or browse local listings to find what you need.",
      image: "/placeholder.svg",
    },
    {
      title: "Connect with farmers or buyers",
      description: "Message directly with local farmers and buyers to arrange exchanges.",
      image: "/placeholder.svg",
    },
    {
      title: "Share, trade, or buy locally",
      description: "Complete your transaction and contribute to a sustainable local economy.",
      image: "/placeholder.svg",
    },
  ];

  const testimonials = [
    {
      quote: "Grovly helped me reduce waste and connect with local buyers who value fresh produce.",
      author: "Sarah M.",
      role: "Local Farmer",
      image: "/placeholder.svg",
    },
    {
      quote: "I love knowing exactly where my food comes from and supporting local agriculture.",
      author: "Michael R.",
      role: "Consumer",
      image: "/placeholder.svg",
    },
    {
      quote: "Our café's coffee grounds now help local gardens grow. It's a win-win!",
      author: "Lisa K.",
      role: "Business Owner",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
              Grow Connections.<br />
              Reduce Waste.<br />
              Share Abundance.
            </h1>
            <p className="text-xl text-charcoal-light max-w-2xl mx-auto mb-8">
              Join our community of farmers, consumers, and businesses working together to create a sustainable local food system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/browse"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Explore Listings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-xl bg-cream-dark animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="inline-block p-3 bg-cream rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-charcoal-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-cream-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-xl p-6 h-full flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <img src={step.image} alt={step.title} className="w-full h-48 object-cover rounded-lg mb-6" />
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-charcoal-light">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
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
          <h2 className="text-4xl font-bold mb-8">Start sharing, growing, and saving today!</h2>
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

export default Index;