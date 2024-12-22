import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import farmField from '@/media/farm_field.png';
import garlicFarm from '@/media/garlic_farm.png';


const About = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-charcoal mb-6">
            Connecting Communities, Reducing Waste, and Growing Together
          </h1>
          <p className="text-lg md:text-xl text-center text-charcoal/80 max-w-3xl mx-auto">
            Grovly stands for a lovely growing community. It is a platform that bridges the gap between farmers, consumers, and businesses 
            to create a sustainable, local food ecosystem.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Problem Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-6">The Challenge We're Addressing</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-charcoal/80 mb-4">
                Did you know that farmers often struggle to predict demand, leading to wasted crops, 
                while consumers crave fresh, local produce they can't always find? Businesses, too, 
                generate reusable byproducts that could benefit someone but end up as waste.
              </p>
              <p className="text-lg text-charcoal/80">
                Grovly was created to solve these mismatches by fostering collaboration and sustainability.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={farmField} 
                alt="Beautiful farm field" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-charcoal/80">
                Our mission is to build a world where no food or resource goes to waste, 
                where farmers grow with confidence, and communities thrive through local, 
                sustainable connections.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-charcoal/80">
                We envision a future where every community is self-sufficient, where local 
                produce is always accessible, and where sustainability is not just a goal 
                but a way of life.
              </p>
            </div>
          </div>
        </div>

        {/* Origin Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-6">How It All Started</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img 
                src={garlicFarm} 
                alt="Garlic Farm" 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-lg text-charcoal/80">
                Grovly began when our founder noticed a recurring issue: local garlic was always 
                sold out, but farmers didn't know there was high demand for it. Meanwhile, a 
                nearby café was throwing away coffee grounds that could have been used for 
                mushroom growing. What if there were a way to connect these dots?
              </p>
              <p className="text-lg text-charcoal/80 mt-4">
                That's how Grovly was born—a platform to help farmers, consumers, and 
                businesses work together.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-charcoal mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sustainability",
                description: "We're committed to reducing waste and promoting circular economies."
              },
              {
                title: "Community",
                description: "We believe in strengthening local ties and empowering small farmers."
              },
              {
                title: "Transparency",
                description: "We foster trust through open and honest communication."
              },
              {
                title: "Innovation",
                description: "We leverage technology to create smarter, more efficient connections."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-charcoal/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-charcoal mb-4">
            Join Us in Building a More Sustainable Future
          </h2>
          <p className="text-lg text-charcoal/80 mb-8 max-w-2xl mx-auto">
            Whether you're a farmer, a consumer, or a business, Grovly is here to help you grow.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;