import Navigation from '@/components/Navigation';

const Contact = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal">Contact Us</h1>
          <p className="mt-4 text-charcoal/80">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white shadow rounded-lg p-8 md:p-12 space-y-8">
          <h2 className="text-3xl font-semibold text-charcoal text-center">
            Connect with Us
          </h2>
          <p className="text-charcoal/80 text-center max-w-2xl mx-auto">
            Stay tuned for more updates.
          </p>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LinkedIn */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-charcoal mb-2">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/korinlim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                Connect with me 
              </a>
            </div>

            {/* Address */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-charcoal mb-2">Address</h3>
              <p className="text-charcoal/80">
                Mariehamn, Åland Islands
                <br />
                Finland
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
