import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import MapLoader from './map/MapLoader';
import MapMarker from './map/MapMarker';
import { useMapInitialization } from '@/hooks/useMapInitialization';

const HomeMap = () => {
  const [listings, setListings] = useState<any[]>([]);
  const { mapContainer, map, loading, error } = useMapInitialization();
  const { toast } = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('id, title, location, type, description')
          .not('location', 'is', null);
        
        if (error) throw error;
        setListings(data || []);
      } catch (error: any) {
        console.error('Error fetching listings:', error);
        toast({
          title: "Error",
          description: "Failed to fetch listings. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchListings();
  }, [toast]);

  useEffect(() => {
    const addMarkersToMap = async () => {
      if (!map.current || listings.length === 0) return;

      for (const listing of listings) {
        if (!listing.location) continue;

        try {
          const { data: { token } } = await supabase.functions.invoke('get-mapbox-token');
          
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              listing.location
            )}.json?access_token=${token}`
          );
          
          if (!response.ok) {
            throw new Error('Geocoding request failed');
          }
          
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            <MapMarker 
              listing={listing}
              map={map.current}
              coordinates={[lng, lat]}
            />;
          }
        } catch (error) {
          console.error('Error geocoding location:', listing.location, error);
        }
      }
    };

    addMarkersToMap();
  }, [listings, map]);

  if (loading || error) {
    return <MapLoader error={error} />;
  }

  return (
    <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default HomeMap;