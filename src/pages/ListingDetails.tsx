import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import ListingHeader from '@/components/listings/ListingHeader';
import ListingInfo from '@/components/listings/ListingInfo';
import ListerInfo from '@/components/listings/ListerInfo';
import SaveListingButton from '@/components/listings/SaveListingButton';
import ListingDetailsLoading from '@/components/listings/ListingDetailsLoading';
import ListingNotFound from '@/components/listings/ListingNotFound';

const ListingDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (!id?.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          throw new Error('Invalid listing ID format');
        }

        const { data, error } = await supabase
          .from('listings')
          .select(`
            *,
            profiles:user_id (
              display_name,
              bio,
              location,
              phone,
              show_contact_info
            )
          `)
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            variant: "destructive",
            title: "Not found",
            description: "This listing could not be found.",
          });
          return;
        }
        
        setListing(data);
      } catch (error: any) {
        console.error('Error fetching listing:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to load listing details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, toast]);

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

  if (loading) {
    return <ListingDetailsLoading />;
  }

  if (!listing) {
    return <ListingNotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-end">
              <SaveListingButton listingId={id!} />
            </div>

            <ListingHeader
              title={listing.title}
              image={listing.image || '/placeholder.svg'}
              availability={listing.availability_date ? new Date(listing.availability_date).toLocaleDateString() : 'Available Now'}
              category={listing.category}
            />

            <ListingInfo
              description={listing.description}
              quantity={listing.quantity}
              unit={listing.unit}
              location={listing.location}
              availabilityDate={listing.availability_date}
            />
          </div>

          <div className="space-y-6">
            <ListerInfo
              displayName={listing.profiles?.display_name}
              bio={listing.profiles?.bio}
              location={listing.profiles?.location}
              phone={listing.profiles?.phone}
              showContactInfo={listing.profiles?.show_contact_info}
              onContactClick={handleContactSeller}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;