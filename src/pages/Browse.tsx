import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '@/components/browse/SearchBar';
import FilterBar from '@/components/browse/FilterBar';
import ListingGrid from '@/components/browse/ListingGrid';
import LoadingGrid from '@/components/browse/LoadingGrid';

interface Listing {
  id: string;
  title: string;
  category: string;
  location: string | null;
  quantity: number | null;
  unit: string | null;
  availability_date: string | null;
  image?: string;
}

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
    const fetchListings = async () => {
      try {
        setLoading(true);
        let query = supabase.from('listings').select('*');

        // Apply filters
        if (searchTerm) {
          query = query.ilike('title', `%${searchTerm}%`);
        }
        if (produceType) {
          query = query.eq('category', produceType);
        }
        if (resourceType) {
          query = query.eq('type', resourceType);
        }
        if (location) {
          query = query.ilike('location', `%${location}%`);
        }
        if (availability === 'immediate') {
          query = query.lte('availability_date', new Date().toISOString());
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        console.log('Fetched listings:', data); // Debug log
        setListings(data || []);
      } catch (error: any) {
        console.error('Error fetching listings:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load listings. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchTerm, produceType, resourceType, location, availability, toast]);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <FilterBar
              produceType={produceType}
              resourceType={resourceType}
              location={location}
              availability={availability}
              onProduceTypeChange={setProduceType}
              onResourceTypeChange={setResourceType}
              onLocationChange={setLocation}
              onAvailabilityChange={setAvailability}
            />
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <LoadingGrid />
        ) : (
          <ListingGrid listings={listings} />
        )}
      </main>
    </div>
  );
};

export default Browse;