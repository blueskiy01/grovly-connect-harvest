import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  displayName: string;
  role?: 'farmer' | 'consumer' | 'business';
  getInitials: (name: string | null) => string;
}

const ProfileHeader = ({ displayName, role, getInitials }: ProfileHeaderProps) => {
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
        <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
          {role || 'User'}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;