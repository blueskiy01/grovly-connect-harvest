import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, MessageCircle, Star, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ListerInfoProps {
  profile: {
    display_name: string | null;
    bio: string | null;
    location: string | null;
    phone: string | null;
    show_contact_info: boolean | null;
  };
}

const ListerInfo = ({ profile }: ListerInfoProps) => {
  const { toast } = useToast();

  const handleContactSeller = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to contact sellers.",
        });
        return;
      }

      toast({
        title: "Coming soon",
        description: "This feature is under development.",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {profile.display_name?.[0] || 'U'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{profile.display_name || 'User'}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>4.8</span>
              <span className="text-sm">(12 reviews)</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
          {profile.show_contact_info && (
            <>
              <p className="text-sm">
                <MapPin className="h-4 w-4 inline mr-2" />
                {profile.location}
              </p>
              {profile.phone && (
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {profile.phone}
                </p>
              )}
            </>
          )}
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={handleContactSeller}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Seller
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