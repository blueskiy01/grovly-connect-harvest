import { Link } from 'react-router-dom';
import { Home, Globe, Mail, Book, Search, Users, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-fraunces font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <Home size={16} />
                Home
              </Link>
              <Link to="/about" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <Globe size={16} />
                About
              </Link>
              <Link to="/contact" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <Mail size={16} />
                Contact
              </Link>
              <Link to="/how-it-works" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <Book size={16} />
                How It Works
              </Link>
              <Link to="/browse" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <Search size={16} />
                Browse Listings
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-fraunces font-semibold text-lg">Resources</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/privacy" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <FileText size={16} />
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-charcoal-light hover:text-primary transition-colors flex items-center gap-2">
                <FileText size={16} />
                Terms of Service
              </Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-fraunces font-semibold text-lg">Connect With Us</h3>
            <div className="flex space-x-4">
              <Globe className="h-6 w-6 text-charcoal-light hover:text-primary transition-colors cursor-pointer" />
              <Users className="h-6 w-6 text-charcoal-light hover:text-primary transition-colors cursor-pointer" />
              <Mail className="h-6 w-6 text-charcoal-light hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="text-center text-charcoal-light text-sm">
            © {new Date().getFullYear()} Grovly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;