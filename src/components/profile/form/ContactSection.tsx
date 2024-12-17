import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone } from 'lucide-react';

interface ContactSectionProps {
  location: string;
  email: string;
  phone: string;
  onLocationChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const ContactSection = ({
  location,
  email,
  phone,
  onLocationChange,
  onPhoneChange,
}: ContactSectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
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
    </div>
  );
};

export default ContactSection;