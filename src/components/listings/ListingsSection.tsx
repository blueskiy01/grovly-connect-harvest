import { useState, useEffect } from 'react';
import { ListingCard } from './ListingCard';
import { ListingFilters } from './ListingFilters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Listing } from '@/types/listings';

export const ListingsSection = () => {
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
        setListings(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};