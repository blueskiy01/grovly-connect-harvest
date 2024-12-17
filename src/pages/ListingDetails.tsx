import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar, Box, MessageCircle } from 'lucide-react';

const ListingDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data for demonstration
  const listing = {
    id: '1',
    title: 'Fresh Garlic for Pre-Order',
    category: 'Produce',
    location: 'San Francisco, CA',
    quantity: '10kg available',
    availability: 'September 2024',
    description: 'Pre-order our premium organic garlic harvest. Perfect for restaurants and home cooks looking for locally sourced ingredients. We practice sustainable farming methods and guarantee the highest quality produce.',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    farmer: {
      name: 'Sarah Johnson',
      rating: 4.8,
      responseTime: 'Usually responds within 2 hours',
    },
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {listing.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${listing.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{listing.title}</h1>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {listing.category}
                </span>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-muted-foreground" />
                    <span>{listing.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <span>{listing.availability}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-muted-foreground">{listing.description}</p>
              </div>

              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{listing.farmer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {listing.farmer.responseTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">★ {listing.farmer.rating}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex gap-4">
                <Button className="flex-1" size="lg">
                  Pre-order Now
                </Button>
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;