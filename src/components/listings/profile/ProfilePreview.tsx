import { Star } from 'lucide-react';

interface ProfilePreviewProps {
  displayName: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  showContactInfo: boolean | null;
}

const ProfilePreview = ({ displayName, bio, location, phone, showContactInfo }: ProfilePreviewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-semibold text-primary">
            {displayName?.[0] || 'U'}
          </span>
        </div>
        <div>
          <h3 className="font-semibold">{displayName || 'User'}</h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4" />
            <span>4.8</span>
            <span className="text-sm">(12 reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{bio}</p>
        {showContactInfo && (
          <>
            {location && (
              <p className="text-sm">
                <span className="font-medium">Location:</span> {location}
              </p>
            )}
            {phone && (
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {phone}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;