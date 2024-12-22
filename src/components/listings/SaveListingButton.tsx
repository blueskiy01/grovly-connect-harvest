import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SaveListingButtonProps {
  listingId: string;
}

const SaveListingButton = ({ listingId }: SaveListingButtonProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkIfSaved = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from('saved_listings')
        .select()
        .eq('user_id', session.user.id)
        .eq('listing_id', listingId)
        .single();

      setIsSaved(!!data);
    };

    checkIfSaved();
  }, [listingId]);

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

      if (isSaved) {
        const { error } = await supabase
          .from('saved_listings')
          .delete()
          .eq('user_id', session.user.id)
          .eq('listing_id', listingId);

        if (error) throw error;

        setIsSaved(false);
        toast({
          title: "Success",
          description: "Listing removed from your favorites.",
        });
      } else {
        const { error } = await supabase
          .from('saved_listings')
          .upsert({
            listing_id: listingId,
            user_id: session.user.id
          });

        if (error) throw error;

        setIsSaved(true);
        toast({
          title: "Success",
          description: "Listing saved to your favorites.",
        });
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save listing. Please try again.",
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
      <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default SaveListingButton;