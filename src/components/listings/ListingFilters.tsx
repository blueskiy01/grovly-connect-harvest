import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ListingFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  produceType: string;
  setProduceType: (value: string) => void;
  resourceType: string;
  setResourceType: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
}

export const ListingFilters = ({
  searchTerm,
  setSearchTerm,
  produceType,
  setProduceType,
  resourceType,
  setResourceType,
  location,
  setLocation,
  availability,
  setAvailability,
}: ListingFiltersProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search by crop, location, or resource"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white"
          />
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={produceType} onValueChange={setProduceType}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Produce Type" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all_produce">All Produce</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="berries">Berries</SelectItem>
              <SelectItem value="herbs">Herbs</SelectItem>
            </SelectContent>
          </Select>

          <Select value={resourceType} onValueChange={setResourceType}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all_resources">All Resources</SelectItem>
              <SelectItem value="compost">Compost</SelectItem>
              <SelectItem value="animal-feed">Animal Feed</SelectItem>
              <SelectItem value="fertilizer">Fertilizer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all_locations">All Locations</SelectItem>
              <SelectItem value="stockholm">Stockholm</SelectItem>
              <SelectItem value="gothenburg">Gothenburg</SelectItem>
              <SelectItem value="malmo">Malmö</SelectItem>
            </SelectContent>
          </Select>

          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="all_availability">All Availability</SelectItem>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="future">Future Harvest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};