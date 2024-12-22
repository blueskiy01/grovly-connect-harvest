import { Card, CardContent } from "@/components/ui/card";
import Map from "@/components/Map";

interface ListingLocationMapProps {
  location: string | null;
}

const ListingLocationMap = ({ location }: ListingLocationMapProps) => {
  if (!location) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="h-[300px] rounded-lg overflow-hidden">
          <Map location={location} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingLocationMap;