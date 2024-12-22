import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, MessageCircle, Star, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ListerInfoProps {
  profile: {
    id: string;
    display_name: string | null;
    bio: string | null;
    location: string | null;
    phone: string | null;
    show_contact_info: boolean | null;
  };
  listingId: string;
}

const ListerInfo = ({ profile, listingId }: ListerInfoProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("Hi! I'm interested in your listing.");

  const handleContactSeller = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to contact sellers.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      setIsMessageDialogOpen(true);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: session.user.id,
          recipient_id: profile.id,
          listing_id: listingId,
          content: message,
        });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "You can view your conversation in the messages section.",
      });
      
      setIsMessageDialogOpen(false);
      navigate('/messages');
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewProfile = () => {
    navigate(`/profile/${profile.id}/public`);
  };

  return (
    <>
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
            <Button variant="outline" className="w-full" onClick={handleViewProfile}>
              View Profile
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to {profile.display_name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListerInfo;