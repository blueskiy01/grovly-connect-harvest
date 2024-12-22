import { Badge } from '@/components/ui/badge';
import SaveListingButton from './SaveListingButton';

interface ListingHeaderProps {
  title: string;
  category: string;
  type: string;
  image?: string;
  listingId: string;
}

const ListingHeader = ({ title, category, type, image, listingId }: ListingHeaderProps) => {
  return (
    <div>
      <div className="aspect-video relative rounded-lg overflow-hidden bg-cream flex items-center justify-center">
        <span className="font-fraunces text-4xl font-bold text-primary">
          Grovly
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">{type}</Badge>
          </div>
        </div>
        <SaveListingButton listingId={listingId} />
      </div>
    </div>
  );
};

export default ListingHeader;