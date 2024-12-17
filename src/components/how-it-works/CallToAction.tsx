import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;