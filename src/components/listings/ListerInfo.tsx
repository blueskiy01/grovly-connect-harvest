import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ChevronRight, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ListerInfoProps {
  displayName: string;
  bio: string | null;
  location: string | null;
  phone: string | null;
  showContactInfo: boolean;
  onContactClick: () => void;
}

const ListerInfo = ({ 
  displayName, 
  bio, 
  location, 
  phone, 
  showContactInfo,
  onContactClick 
}: ListerInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{displayName?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{displayName || 'User'}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>4.8</span>
              <span className="text-sm">(12 reviews)</span>
            </div>
          </div>
        </div>

        <Separator />

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

        <div className="space-y-3">
          <Button className="w-full" onClick={onContactClick}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Lister
          </Button>
          <Button variant="outline" className="w-full">
            View Profile
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListerInfo;