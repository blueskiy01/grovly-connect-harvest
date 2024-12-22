import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { DesktopMenu } from './navigation/DesktopMenu';
import { MobileMenu } from './navigation/MobileMenu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  return (
    <>
      <div className="h-16" /> {/* Spacer to prevent content jump */}
      <nav className="fixed top-0 left-0 right-0 bg-cream/90 backdrop-blur-sm z-50 border-b border-primary/10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="font-fraunces text-2xl font-bold text-primary">
                Grovly
              </Link>
            </div>

            <DesktopMenu navItems={[
              { name: 'Browse', path: '/browse' },
              { name: 'How It Works', path: '/how-it-works' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ]} user={user} profile={profile} />

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-charcoal hover:text-primary transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          navItems={[
            { name: 'Browse', path: '/browse' },
            { name: 'How It Works', path: '/how-it-works' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
          ]}
          user={user}
          handleLogout={async () => {
            await supabase.auth.signOut();
            navigate('/');
          }}
          onClose={() => setIsOpen(false)}
        />
      </nav>
    </>
  );
};

export default Navigation;