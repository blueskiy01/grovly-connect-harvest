import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingFilters } from '@/components/listings/ListingFilters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Listing } from '@/types/listings';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [produceType, setProduceType] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Insert sample listings if none exist
  useEffect(() => {
    const insertSampleListings = async () => {
      if (listings.length === 0) {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log('User not authenticated, skipping sample listings insertion');
          return;
        }

        const sampleListings = [
          {
            title: 'Organic Heritage Garlic',
            type: 'Produce',
            category: 'Vegetables',
            location: 'Uppsala, Sweden',
            quantity: 50,
            unit: 'kg',
            description: 'Pre-order our award-winning Nordic garlic varieties. Perfect for traditional dishes.',
            availability_date: '2024-08-15',
            user_id: user.id,
            status: 'active'
          },
          {
            title: 'Fresh Coffee Grounds for Composting',
            type: 'Resource',
            category: 'Compost',
            location: 'Stockholm, Sweden',
            quantity: 20,
            unit: 'kg',
            description: 'Weekly available coffee grounds from our local café. Great for mushroom growing and composting.',
            availability_date: '2024-04-20',
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
            availability_date: '2024-09-01',
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
            availability_date: '2024-04-25',
            user_id: user.id,
            status: 'active'
          },
          {
            title: 'Horse Manure - Aged',
            type: 'Resource',
            category: 'Fertilizer',
            location: 'Oslo, Norway',
            quantity: 500,
            unit: 'kg',
            description: 'Well-aged horse manure from our organic farm. Perfect for soil enrichment.',
            availability_date: '2024-04-22',
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
      }
    };

    insertSampleListings();
  }, [listings.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
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
      </main>
    </div>
  );
};

export default Browse;