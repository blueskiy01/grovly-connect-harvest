import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  produceType: string;
  resourceType: string;
  location: string;
  availability: string;
  onProduceTypeChange: (value: string) => void;
  onResourceTypeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
}

const FilterBar = ({
  produceType,
  resourceType,
  location,
  availability,
  onProduceTypeChange,
  onResourceTypeChange,
  onLocationChange,
  onAvailabilityChange,
}: FilterBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Select value={produceType} onValueChange={onProduceTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Produce Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="garlic">Garlic</SelectItem>
          <SelectItem value="tomatoes">Tomatoes</SelectItem>
          <SelectItem value="lettuce">Lettuce</SelectItem>
        </SelectContent>
      </Select>

      <Select value={resourceType} onValueChange={onResourceTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Resource Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="compost">Compost</SelectItem>
          <SelectItem value="coffee-grounds">Coffee Grounds</SelectItem>
          <SelectItem value="wood-chips">Wood Chips</SelectItem>
        </SelectContent>
      </Select>

      <Select value={location} onValueChange={onLocationChange}>
        <SelectTrigger>
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5mi">Within 5 miles</SelectItem>
          <SelectItem value="10mi">Within 10 miles</SelectItem>
          <SelectItem value="25mi">Within 25 miles</SelectItem>
        </SelectContent>
      </Select>

      <Select value={availability} onValueChange={onAvailabilityChange}>
        <SelectTrigger>
          <SelectValue placeholder="Availability" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="immediate">Immediate</SelectItem>
          <SelectItem value="future">Future Harvest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;