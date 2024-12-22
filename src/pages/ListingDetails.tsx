import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Map from '@/components/Map';
import ListingDetailsLoading from '@/components/listings/ListingDetailsLoading';
import ListingNotFound from '@/components/listings/ListingNotFound';
import ListingHeader from '@/components/listings/ListingHeader';
import ListingInfo from '@/components/listings/ListingInfo';
import ListerInfo from '@/components/listings/ListerInfo';

const ListingDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        console.log('Fetching listing with ID:', id);
        
        // Validate UUID format
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
        
        console.log('Fetched listing data:', data);
        
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

  if (loading) {
    return (
      <div>
        <Navigation />
        <ListingDetailsLoading />
      </div>
    );
  }

  if (!listing) {
    return (
      <div>
        <Navigation />
        <ListingNotFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ListingHeader
              title={listing.title}
              category={listing.category}
              type={listing.type}
              image={listing.image}
              listingId={listing.id}
            />

            <ListingInfo
              description={listing.description}
              quantity={listing.quantity}
              unit={listing.unit}
              availabilityDate={listing.availability_date}
              location={listing.location}
            />

            {/* Map Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <Map />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ListerInfo profile={listing.profiles} />

            {/* Similar Listings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Similar Listings</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    More listings coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;
