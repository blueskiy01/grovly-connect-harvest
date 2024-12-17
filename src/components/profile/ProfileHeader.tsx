import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/lib/utils";

interface ProfileHeaderProps {
  displayName: string;
  role?: 'farmer' | 'consumer' | 'business';
  getInitials: (name: string | null) => string;
}

const ProfileHeader = ({ displayName, role, getInitials }: ProfileHeaderProps) => {
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'farmer':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'business':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'consumer':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="flex items-center gap-6 mb-8">
      <Avatar className="h-24 w-24">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback className="bg-primary text-2xl text-white">
          {getInitials(displayName)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold mb-2">{displayName || 'Your Profile'}</h1>
        <Badge variant="secondary" className={getRoleBadgeColor(role)}>
          {role ? capitalize(role) : 'User'}
        </Badge>
      </div>
    </div>
  );
};

export default ProfileHeader;