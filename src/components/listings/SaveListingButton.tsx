import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SaveListingButtonProps {
  listingId: string;
}

const SaveListingButton = ({ listingId }: SaveListingButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSaveListing = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to save listings.",
        });
        return;
      }

      const { error } = await supabase
        .from('saved_listings')
        .upsert({ user_id: session.user.id, listing_id: listingId });

      if (error) throw error;

      setIsSaved(true);
      toast({
        title: "Success",
        description: "Listing saved to your favorites.",
      });
    } catch (error) {
      console.error('Error saving listing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save listing.",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSaveListing}
      className={isSaved ? 'text-primary' : ''}
    >
      <Heart className="h-4 w-4" />
    </Button>
  );
};

export default SaveListingButton;