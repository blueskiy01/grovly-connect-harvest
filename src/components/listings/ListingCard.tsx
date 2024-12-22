import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Box } from 'lucide-react';
import { Listing } from '@/types/listings';

interface ListingCardProps {
  listing: Listing;
}

const getImageForCategory = (category: string) => {
  const images = {
    'Vegetables': 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
    'Fruits': 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    'Dairy': 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac',
    'Meat': 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632',
    'Resources': 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    'default': 'https://images.unsplash.com/photo-1472396961693-142e6e269027'
  };
  return images[category as keyof typeof images] || images.default;
};

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getImageForCategory(listing.category)}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>
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
  );
};