import { Link } from 'react-router-dom';
import { Leaf, Users, Recycle } from 'lucide-react';
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
    </div>
  );
};

export default Index;