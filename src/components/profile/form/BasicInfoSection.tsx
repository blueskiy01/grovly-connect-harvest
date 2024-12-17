import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database['public']['Enums']['user_role'];

interface BasicInfoSectionProps {
  displayName: string;
  role: UserRole;
  onDisplayNameChange: (value: string) => void;
  onRoleChange: (value: UserRole) => void;
}

const BasicInfoSection = ({
  displayName,
  role,
  onDisplayNameChange,
  onRoleChange,
}: BasicInfoSectionProps) => {
  return (
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
        <Label>User Type</Label>
        <ToggleGroup
          type="single"
          value={role}
          onValueChange={(value: UserRole) => value && onRoleChange(value)}
          className="justify-start"
        >
          <ToggleGroupItem value="farmer" className="capitalize">
            Farmer
          </ToggleGroupItem>
          <ToggleGroupItem value="consumer" className="capitalize">
            Consumer
          </ToggleGroupItem>
          <ToggleGroupItem value="business" className="capitalize">
            Business
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default BasicInfoSection;