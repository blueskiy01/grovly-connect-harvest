import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import ListingHeader from '@/components/listings/ListingHeader';
import ListingInfo from '@/components/listings/ListingInfo';
import ListerInfo from '@/components/listings/ListerInfo';

const ListingDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
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
        .upsert({ user_id: session.user.id, listing_id: id });

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
    return (
      <div>
        <Navigation />
        <div className="pt-24 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 w-1/2 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div>
        <Navigation />
        <div className="pt-24 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <p className="mt-2 text-muted-foreground">
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse">
            <Button className="mt-4">Back to Browse</Button>
          </Link>
        </div>
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
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSaveListing}
                className={isSaved ? 'text-primary' : ''}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <ListingHeader
              title={listing.title}
              image={listing.image}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <ListerInfo
              displayName={listing.profiles?.display_name}
              bio={listing.profiles?.bio}
              location={listing.profiles?.location}
              phone={listing.profiles?.phone}
              showContactInfo={listing.profiles?.show_contact_info}
              onContactClick={handleContactSeller}
            />

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