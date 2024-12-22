import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export const useMapInitialization = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [15.5, 62.8],
          zoom: 8,
          pitchWithRotate: false,
        });

        map.current.addControl(new mapboxgl.NavigationControl({
          showCompass: false
        }), 'top-right');

        // Add zoom event handler
        map.current.on('zoom', () => {
          if (map.current) {
            const currentZoom = map.current.getZoom();
            const markers = document.getElementsByClassName('custom-marker');
            Array.from(markers).forEach((marker: any) => {
              const scale = Math.max(0.5, Math.min(1, currentZoom / 10));
              marker.style.transform = `scale(${scale})`;
            });
          }
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to initialize map');
        toast({
          title: "Error",
          description: "Failed to initialize map. Please try again later.",
          variant: "destructive",
        });
      }
    };

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
      } finally {
        setLoading(false);
      }
    };

    getMapboxToken();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [toast]);

  return { mapContainer, map, loading, error };
};