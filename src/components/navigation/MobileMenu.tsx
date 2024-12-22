import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ name: string; path: string; }>;
  user: any;
  handleLogout: () => void;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, navItems, user, handleLogout, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-cream border-t border-primary/10">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block px-3 py-2 text-charcoal-light hover:text-primary transition-colors"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="block px-3 py-2 text-charcoal-light hover:text-primary transition-colors"
              onClick={onClose}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 text-charcoal-light hover:text-primary transition-colors"
              onClick={onClose}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 text-charcoal-light hover:text-primary transition-colors"
              onClick={onClose}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="block px-3 py-2 text-primary hover:text-primary-dark transition-colors"
            onClick={onClose}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};