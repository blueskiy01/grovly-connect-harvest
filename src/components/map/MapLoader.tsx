import { Loader2 } from 'lucide-react';

interface MapLoaderProps {
  error?: string | null;
}

const MapLoader = ({ error }: MapLoaderProps) => {
  if (error) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default MapLoader;