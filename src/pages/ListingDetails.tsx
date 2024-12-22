import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Heart, MessageCircle, MapPin, Calendar, Box, Star, ChevronRight } from 'lucide-react';
import Map from '@/components/Map';

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

      // Navigate to messages or open message modal
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
            {/* Header Section */}
            <div>
              <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={listing.image || '/placeholder.svg'}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{listing.title}</h1>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="secondary">{listing.category}</Badge>
                    <Badge variant="outline">{listing.type}</Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSaveListing}
                  className={isSaved ? 'text-primary' : ''}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Listing Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">About this {listing.category.toLowerCase()}</h2>
                  <p className="text-muted-foreground">{listing.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span>Quantity: {listing.quantity} {listing.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Available: {listing.availability_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
            {/* Seller Information */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {listing.profiles?.display_name?.[0] || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{listing.profiles?.display_name || 'User'}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>4.8</span>
                      <span className="text-sm">(12 reviews)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{listing.profiles?.bio}</p>
                  {listing.profiles?.show_contact_info && (
                    <>
                      <p className="text-sm">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {listing.profiles.location}
                      </p>
                      {listing.profiles.phone && (
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> {listing.profiles.phone}
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