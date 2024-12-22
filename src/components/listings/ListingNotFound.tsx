import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';

const ListingNotFound = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-24 container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="mt-2 text-muted-foreground">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/browse">
          <Button className="mt-4">Back to Browse</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListingNotFound;