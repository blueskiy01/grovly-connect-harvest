import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import BasicInfoSection from "./form/BasicInfoSection";
import ContactSection from "./form/ContactSection";
import BioSection from "./form/BioSection";
import PrivacySection from "./form/PrivacySection";

type UserRole = Database['public']['Enums']['user_role'];

interface ProfileFormProps {
  displayName: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  role: UserRole;
  showContactInfo: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onDisplayNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onRoleChange: (value: UserRole) => void;
  onShowContactInfoChange: (value: boolean) => void;
}

const ProfileForm = ({
  displayName,
  bio,
  location,
  email,
  phone,
  role,
  showContactInfo,
  loading,
  onSubmit,
  onDisplayNameChange,
  onBioChange,
  onLocationChange,
  onPhoneChange,
  onRoleChange,
  onShowContactInfoChange,
}: ProfileFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <BasicInfoSection
        displayName={displayName}
        role={role}
        onDisplayNameChange={onDisplayNameChange}
        onRoleChange={onRoleChange}
      />

      <ContactSection
        location={location}
        email={email}
        phone={phone}
        onLocationChange={onLocationChange}
        onPhoneChange={onPhoneChange}
      />

      <BioSection
        bio={bio}
        onBioChange={onBioChange}
      />

      <PrivacySection
        showContactInfo={showContactInfo}
        onShowContactInfoChange={onShowContactInfoChange}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default ProfileForm;