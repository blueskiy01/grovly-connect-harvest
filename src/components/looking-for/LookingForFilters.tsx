import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { X } from 'lucide-react';

interface LookingForFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  startDate: Date | undefined;
  setStartDate: (value: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (value: Date | undefined) => void;
}

export const LookingForFilters = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  location,
  setLocation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: LookingForFiltersProps) => {
  return (
    <div className="bg-cream rounded-lg shadow-sm p-6 mb-8 relative">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white"
          />
          <Button>Search</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="all_categories">All Categories</SelectItem>
              <SelectItem value="produce">Produce</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="resources">Resources</SelectItem>
              <SelectItem value="labor">Labor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="all_locations">All Locations</SelectItem>
              <SelectItem value="stockholm">Stockholm</SelectItem>
              <SelectItem value="gothenburg">Gothenburg</SelectItem>
              <SelectItem value="malmo">Malmö</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <DatePicker
              placeholder="Start Date"
              date={startDate}
              onDateChange={setStartDate}
            />
            {startDate && (
              <button
                onClick={() => setStartDate(undefined)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>

          <div className="relative">
            <DatePicker
              placeholder="End Date"
              date={endDate}
              onDateChange={setEndDate}
            />
            {endDate && (
              <button
                onClick={() => setEndDate(undefined)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};