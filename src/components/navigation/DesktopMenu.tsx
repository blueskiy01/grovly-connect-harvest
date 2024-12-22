import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';

interface DesktopMenuProps {
  navItems: Array<{ name: string; path: string; }>;
  user: any;
  profile: any;
}

export const DesktopMenu = ({ navItems, user, profile }: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-charcoal-light hover:text-primary transition-colors"
        >
          {item.name}
        </Link>
      ))}
      {user ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="text-charcoal-light hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <UserMenu user={user} profile={profile} />
        </div>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};