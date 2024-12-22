import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { ListingCard } from '@/components/listings/ListingCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { Listing } from '@/types/listings';

const UserInteractions = () => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: savedListingsData, error: savedError } = await supabase
          .from('saved_listings')
          .select('listing_id')
          .eq('user_id', session.user.id);

        if (savedError) throw savedError;

        if (savedListingsData) {
          const listingIds = savedListingsData.map(item => item.listing_id);
          const { data: listings, error: listingsError } = await supabase
            .from('listings')
            .select('*')
            .in('id', listingIds)
            .eq('status', 'active');

          if (listingsError) throw listingsError;
          setSavedListings(listings || []);
        }
      } catch (error) {
        console.error('Error fetching saved listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, []);

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="pt-20 flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Interactions</h1>
        
        <Tabs defaultValue={type || "saved"} className="space-y-6">
          <TabsList>
            <TabsTrigger value="saved">Saved Listings</TabsTrigger>
            <TabsTrigger value="interests">Interests Shared</TabsTrigger>
            <TabsTrigger value="preorders">Pre-orders</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            {savedListings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-muted-foreground">No saved listings found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="interests">
            <Card>
              <CardHeader>
                <CardTitle>Interests Shared</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Feature coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preorders">
            <Card>
              <CardHeader>
                <CardTitle>Pre-orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Feature coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserInteractions;