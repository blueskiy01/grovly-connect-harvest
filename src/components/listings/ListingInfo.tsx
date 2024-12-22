import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Box, Calendar, MapPin } from 'lucide-react';

interface ListingInfoProps {
  description: string | null;
  quantity: number | null;
  unit: string | null;
  availabilityDate: string | null;
  location: string | null;
}

const ListingInfo = ({ description, quantity, unit, availabilityDate, location }: ListingInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">About this listing</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {quantity && unit && (
              <div className="flex items-center gap-2">
                <Box className="h-4 w-4 text-muted-foreground" />
                <span>Quantity: {quantity} {unit}</span>
              </div>
            )}
            {availabilityDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Available: {availabilityDate}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingInfo;