import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="Search by crop, location, or resource"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />
      <Button>Search</Button>
    </div>
  );
};

export default SearchBar;