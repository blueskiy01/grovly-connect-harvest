import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Box, Calendar, MapPin } from "lucide-react";
import type { Listing } from "@/types/listings";

interface ListingDetailsContentProps {
  listing: Listing;
}

const ListingDetailsContent = ({ listing }: ListingDetailsContentProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">About this listing</h2>
          <p className="text-muted-foreground">{listing.description}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {listing.quantity && listing.unit && (
              <div className="flex items-center gap-2">
                <Box className="h-4 w-4 text-muted-foreground" />
                <span>Quantity: {listing.quantity} {listing.unit}</span>
              </div>
            )}
            {listing.availability_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Available: {new Date(listing.availability_date).toLocaleDateString()}</span>
              </div>
            )}
            {listing.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{listing.location}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingDetailsContent;