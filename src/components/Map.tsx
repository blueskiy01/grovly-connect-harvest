import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

interface MapProps {
  location?: string;
  zoom?: number;
  interactive?: boolean;
}

const Map = ({ location, zoom = 13, interactive = true }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapContainer.current || !location) return;

        // Fetch the location coordinates using Mapbox Geocoding API
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            location
          )}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            interactive: interactive,
          });

          // Add navigation controls if the map is interactive
          if (interactive) {
            map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
          }

          // Add marker
          marker.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);
        }
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Get Mapbox token from Edge Function
    const getMapboxToken = async () => {
      try {
        const { data: { token }, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) throw error;
        mapboxgl.accessToken = token;
        initializeMap();
      } catch (error) {
        console.error('Error getting Mapbox token:', error);
      }
    };

    getMapboxToken();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location, zoom, interactive]);

  return (
    <div className="w-full h-full bg-muted rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;