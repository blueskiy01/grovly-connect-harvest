import { Link } from 'react-router-dom';
import { MapPin, Calendar, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ListingCardProps {
  id: string;
  title: string;
  category: string;
  location: string | null;
  quantity: number | null;
  unit: string | null;
  availability_date: string | null;
  image?: string;
}

const ListingCard = ({
  id,
  title,
  category,
  location,
  quantity,
  unit,
  availability_date,
  image,
}: ListingCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={image || '/placeholder.svg'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
            {category}
          </span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
          {quantity && unit && (
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4" />
              <span>{quantity} {unit} available</span>
            </div>
          )}
          {availability_date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(availability_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/listings/${id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;