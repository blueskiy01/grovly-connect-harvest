import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from 'lucide-react';

interface ProfileFormProps {
  displayName: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  showContactInfo: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onShowContactInfoChange: (value: boolean) => void;
}

const ProfileForm = ({
  displayName,
  bio,
  location,
  email,
  phone,
  showContactInfo,
  loading,
  onSubmit,
  onDisplayNameChange,
  onBioChange,
  onLocationChange,
  onPhoneChange,
  onShowContactInfoChange,
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            placeholder="Enter your display name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="City, Country"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder="Tell us a bit about yourself..."
            className="h-24"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Your phone number"
              className="pl-10"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showContactInfo}
              onChange={(e) => onShowContactInfoChange(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600">
              Make my contact information visible to other users
            </span>
          </label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default ProfileForm;