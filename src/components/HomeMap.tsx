import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const HomeMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('id, title, location, type')
          .not('location', 'is', null);
        
        if (error) throw error;
        setListings(data || []);
      } catch (error: any) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings');
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
    const initializeMap = async () => {
      try {
        if (!mapContainer.current || listings.length === 0) return;

        // Initialize map centered on Nordic region
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [15.5, 62.8], // Centered approximately on Sweden
          zoom: 4, // Zoom level to show most of Nordic region
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add markers for each listing
        for (const listing of listings) {
          if (!listing.location) continue;

          try {
            // Geocode the location
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                listing.location
              )}.json?access_token=${mapboxgl.accessToken}`
            );
            
            if (!response.ok) {
              throw new Error('Geocoding request failed');
            }
            
            const data = await response.json();

            if (data.features && data.features.length > 0) {
              const [lng, lat] = data.features[0].center;

              // Create a popup
              const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2">
                  <h3 class="font-semibold">${listing.title}</h3>
                  <p class="text-sm text-gray-600">${listing.type}</p>
                  <p class="text-sm text-gray-600">${listing.location}</p>
                </div>`
              );

              // Create a marker
              const marker = new mapboxgl.Marker({
                color: listing.type === 'Produce' ? '#22c55e' : '#3b82f6',
              })
                .setLngLat([lng, lat])
                .setPopup(popup)
                .addTo(map.current);

              // Add click event to navigate to listing
              marker.getElement().addEventListener('click', () => {
                navigate(`/listings/${listing.id}`);
              });
            }
          } catch (error) {
            console.error('Error geocoding location:', listing.location, error);
          }
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to initialize map');
        toast({
          title: "Error",
          description: "Failed to initialize map. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Get Mapbox token from Edge Function
    const getMapboxToken = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) throw error;
        if (!data?.token) throw new Error('No token returned from function');
        
        mapboxgl.accessToken = data.token;
        await initializeMap();
      } catch (error: any) {
        console.error('Error getting Mapbox token:', error);
        setError('Failed to load map configuration');
        toast({
          title: "Error",
          description: "Failed to load map configuration. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    getMapboxToken();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [listings, navigate, toast]);

  if (loading) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default HomeMap;