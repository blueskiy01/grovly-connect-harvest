import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BioSectionProps {
  bio: string;
  onBioChange: (value: string) => void;
}

const BioSection = ({ bio, onBioChange }: BioSectionProps) => {
  return (
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
  );
};

export default BioSection;