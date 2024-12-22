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

        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-charcoal text-center">
            Connect
          </h2>
          <p className="text-charcoal/80 text-center">
            Stay tuned for more updates.
          </p>

          <div className="space-y-6">
            {/* LinkedIn */}
            <div>
              <h3 className="font-semibold text-charcoal">LinkedIn</h3>
              <a
                href="https://linkedin.com/in/korinlim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                linkedin.com/in/korinlim/
              </a>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-semibold text-charcoal">Address</h3>
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
