import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import ProfilePreview from './profile/ProfilePreview';
import MessageDialog from './message/MessageDialog';
import ContactButtons from './profile/ContactButtons';

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
          <ProfilePreview
            displayName={profile.display_name}
            bio={profile.bio}
            location={profile.location}
            phone={profile.phone}
            showContactInfo={profile.show_contact_info}
          />
          
          <Separator />
          
          <ContactButtons
            onContact={handleContactSeller}
            onViewProfile={handleViewProfile}
          />
        </CardContent>
      </Card>

      <MessageDialog
        isOpen={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        recipientName={profile.display_name}
        message={message}
        onMessageChange={setMessage}
        onSend={handleSendMessage}
      />
    </>
  );
};

export default ListerInfo;