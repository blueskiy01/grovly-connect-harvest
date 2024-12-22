import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronRight } from "lucide-react";

interface ContactButtonsProps {
  onContact: () => void;
  onViewProfile: () => void;
}

const ContactButtons = ({ onContact, onViewProfile }: ContactButtonsProps) => {
  return (
    <div className="space-y-3">
      <Button className="w-full" onClick={onContact}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Contact Seller
      </Button>
      <Button variant="outline" className="w-full" onClick={onViewProfile}>
        View Profile
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ContactButtons;