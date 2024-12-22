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

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-charcoal"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-primary hover:bg-primary-dark rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-charcoal">
              Our Contact Information
            </h2>
            <p className="text-charcoal/80">
              Reach out to us through the following channels:
            </p>
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
            <div>
              <h3 className="font-semibold text-charcoal">Phone</h3>
              <p className="text-charcoal/80">+123 456 789</p>
            </div>
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
