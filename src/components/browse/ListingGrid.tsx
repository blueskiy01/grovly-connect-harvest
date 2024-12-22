import ListingCard from './ListingCard';

interface Listing {
  id: string;
  title: string;
  category: string;
  location: string | null;
  quantity: number | null;
  unit: string | null;
  availability_date: string | null;
  image?: string;
}

interface ListingGridProps {
  listings: Listing[];
}

const ListingGrid = ({ listings }: ListingGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {listings.map((listing) => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </div>
  );
};

export default ListingGrid;