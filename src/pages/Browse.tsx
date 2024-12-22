import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Calendar, Box } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  category: 'Produce' | 'Waste Resource';
  location: string;
  quantity: string;
  availability: string;
  image: string;
}

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [produceType, setProduceType] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');

  // Mock data with proper UUID format
  const listings: Listing[] = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Fresh Garlic for Pre-Order',
      category: 'Produce',
      location: 'San Francisco, CA',
      quantity: '10kg available',
      availability: 'September 2024',
      image: '/placeholder.svg',
    },
    {
      id: '987fcdeb-51a2-43d8-b456-426614174001',
      title: 'Coffee Grounds for Composting',
      category: 'Waste Resource',
      location: 'Berkeley, CA',
      quantity: '5kg weekly',
      availability: 'Immediate',
      image: '/placeholder.svg',
    },
    {
      id: '456e789a-b12c-34d5-e678-426614174002',
      title: 'Heirloom Tomatoes',
      category: 'Produce',
      location: 'Oakland, CA',
      quantity: '15kg available',
      availability: 'August 2024',
      image: '/placeholder.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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
                  <SelectItem value="garlic">Garlic</SelectItem>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="lettuce">Lettuce</SelectItem>
                </SelectContent>
              </Select>

              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compost">Compost</SelectItem>
                  <SelectItem value="coffee-grounds">Coffee Grounds</SelectItem>
                  <SelectItem value="wood-chips">Wood Chips</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5mi">Within 5 miles</SelectItem>
                  <SelectItem value="10mi">Within 10 miles</SelectItem>
                  <SelectItem value="25mi">Within 25 miles</SelectItem>
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
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                    {listing.category}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4" />
                    <span>{listing.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{listing.availability}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link to={`/listings/${listing.id}`} className="w-full">
                  <Button className="w-full" variant="outline">
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