import { Badge } from "@/components/ui/badge";

interface ListingHeaderProps {
  title: string;
  image: string;
  availability: string;
  category: string;
}

const ListingHeader = ({ title, image, availability, category }: ListingHeaderProps) => {
  return (
    <div>
      <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">{availability}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;