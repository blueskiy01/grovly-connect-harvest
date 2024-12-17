const Hero = () => {
  return (
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
  );
};

export default Hero;