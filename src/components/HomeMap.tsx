import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const HomeMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select('id, title, location, type')
          .not('location', 'is', null);
        
        if (error) throw error;
        setListings(data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!mapContainer.current || listings.length === 0) return;

        // Initialize map centered on a default location
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [0, 20], // Default center
          zoom: 2,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add markers for each listing
        for (const listing of listings) {
          if (!listing.location) continue;

          // Geocode the location
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              listing.location
            )}.json?access_token=${mapboxgl.accessToken}`
          );
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
  }, [listings, navigate]);

  return (
    <div className="w-full h-[400px] bg-muted rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default HomeMap;