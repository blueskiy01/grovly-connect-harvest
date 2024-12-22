import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingFilters } from '@/components/listings/ListingFilters';
import { LookingForCard } from '@/components/looking-for/LookingForCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Listing } from '@/types/listings';
import type { LookingForRequest } from '@/types/looking-for';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [produceType, setProduceType] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [lookingForRequests, setLookingForRequests] = useState<LookingForRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
    fetchLookingForRequests();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching listings:', error);
        toast({
          variant: "destructive",
          title: "Error fetching listings",
          description: error.message
        });
        return;
      }

      if (data) {
        console.log('Fetched listings:', data);
        setListings(data);
      }

      // If no listings exist, insert sample listings
      if (!data || data.length === 0) {
        await insertSampleListings();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLookingForRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('looking_for_requests')
        .select('*, profiles(display_name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching looking for requests:', error);
        toast({
          variant: "destructive",
          title: "Error fetching requests",
          description: error.message
        });
        return;
      }

      if (data) {
        setLookingForRequests(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const insertSampleListings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('User not authenticated, skipping sample listings insertion');
        return;
      }

      const sampleListings = [
        {
          title: 'Apple Peels for Composting',
          type: 'Resource',
          category: 'Compost',
          location: 'Mariehamn, Åland',
          quantity: 10,
          unit: 'kg/week',
          description: 'Organic apple peels from our juicing process, ideal for compost.',
          availability_date: new Date().toISOString().split('T')[0],
          user_id: user.id,
          status: 'active'
        },
        {
          title: 'Fresh Herbs – Available Weekly',
          type: 'Produce',
          category: 'Herbs',
          location: 'Jomala, Åland',
          quantity: 1,
          unit: 'bundle',
          description: 'Mint, basil, and thyme available freshly harvested every week.',
          availability_date: new Date().toISOString().split('T')[0],
          user_id: user.id,
          status: 'active'
        },
        {
          title: 'Fresh Garlic',
          type: 'Produce',
          category: 'Vegetables',
          location: 'Åland, Finland',
          quantity: 10,
          unit: 'kg',
          description: 'Organically grown garlic. Available in 1kg boxes.',
          availability_date: new Date().toISOString().split('T')[0],
          user_id: user.id,
          status: 'active'
        },
        {
          title: 'Organic Lingonberries',
          type: 'Produce',
          category: 'Berries',
          location: 'Gothenburg, Sweden',
          quantity: 30,
          unit: 'kg',
          description: 'Wild-harvested lingonberries from sustainable forest areas.',
          availability_date: new Date().toISOString().split('T')[0],
          user_id: user.id,
          status: 'active'
        },
        {
          title: 'Spent Grain from Local Brewery',
          type: 'Resource',
          category: 'Animal Feed',
          location: 'Malmö, Sweden',
          quantity: 100,
          unit: 'kg',
          description: 'Weekly available spent grain. High in protein, perfect for livestock feed or composting.',
          availability_date: new Date().toISOString().split('T')[0],
          user_id: user.id,
          status: 'active'
        }
      ];

      for (const listing of sampleListings) {
        const { error } = await supabase
          .from('listings')
          .insert([listing]);
        
        if (error) {
          console.error('Error inserting sample listing:', error);
          toast({
            variant: "destructive",
            title: "Error inserting sample listing",
            description: error.message
          });
        }
      }

      // Fetch the listings again after inserting samples
      fetchListings();
    } catch (error) {
      console.error('Error inserting sample listings:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="listings">Available Listings</TabsTrigger>
            <TabsTrigger value="looking-for">Looking For</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <ListingFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              produceType={produceType}
              setProduceType={setProduceType}
              resourceType={resourceType}
              setResourceType={setResourceType}
              location={location}
              setLocation={setLocation}
              availability={availability}
              setAvailability={setAvailability}
            />

            {loading ? (
              <div className="text-center">Loading listings...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="looking-for">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {lookingForRequests.map((request) => (
                <LookingForCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Browse;
