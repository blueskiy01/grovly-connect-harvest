import { MapPin, Calendar, Box } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Map from "@/components/Map";

interface ListingInfoProps {
  description: string;
  quantity: number;
  unit: string;
  location: string;
  availabilityDate: string;
}

const ListingInfo = ({ description, quantity, unit, location, availabilityDate }: ListingInfoProps) => {
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
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              <span>Quantity: {quantity} {unit}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Available: {availabilityDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingInfo;