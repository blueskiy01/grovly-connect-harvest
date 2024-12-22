import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Calendar, Box } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Listing {
  id: string;
  title: string;
  type: string;
  category: string;
  location: string;
  quantity: string;
  availability_date: string;
  description: string;
  unit: string;
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [produceType, setProduceType] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

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
            user_id: '123e4567-e89b-12d3-a456-426614174000', // Replace with actual user ID
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
            user_id: '123e4567-e89b-12d3-a456-426614174000',
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
            user_id: '123e4567-e89b-12d3-a456-426614174000',
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
            user_id: '123e4567-e89b-12d3-a456-426614174000',
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
            user_id: '123e4567-e89b-12d3-a456-426614174000',
          }
        ];

        for (const listing of sampleListings) {
          const { error } = await supabase
            .from('listings')
            .insert([listing]);
          
          if (error) {
            console.error('Error inserting sample listing:', error);
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
        {/* Search and Filters Section */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search by crop, location, or resource"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button>Search</Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={produceType} onValueChange={setProduceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Produce Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="berries">Berries</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                </SelectContent>
              </Select>

              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compost">Compost</SelectItem>
                  <SelectItem value="animal-feed">Animal Feed</SelectItem>
                  <SelectItem value="fertilizer">Fertilizer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stockholm">Stockholm</SelectItem>
                  <SelectItem value="gothenburg">Gothenburg</SelectItem>
                  <SelectItem value="malmo">Malmö</SelectItem>
                </SelectContent>
              </Select>

              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="future">Future Harvest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <Badge variant={listing.type === 'Produce' ? 'default' : 'secondary'}>
                    {listing.type}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    <span>{listing.quantity} {listing.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available: {new Date(listing.availability_date).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 line-clamp-2">{listing.description}</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link to={`/listings/${listing.id}`} className="w-full">
                  <Button className="w-full" variant="default">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;