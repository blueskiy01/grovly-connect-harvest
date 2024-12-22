import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

interface MapMarkerProps {
  listing: {
    id: string;
    title: string;
    type: string;
    description?: string;
    location: string;
  };
  map: mapboxgl.Map;
  coordinates: [number, number];
}

const MapMarker = ({ listing, map, coordinates }: MapMarkerProps) => {
  const navigate = useNavigate();

  // Create marker element
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.backgroundColor = listing.type === 'Produce' ? '#22c55e' : '#3b82f6';
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.borderRadius = '50%';
  el.style.border = '2px solid white';
  el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.18)';
  el.style.cursor = 'pointer';
  el.style.transition = 'transform 0.2s ease';

  // Add hover effects
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.1)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
  });

  // Create popup
  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
    maxWidth: '300px'
  }).setHTML(
    `<div class="p-3 font-inter">
      <h3 class="font-semibold text-base mb-1">${listing.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${listing.type}</p>
      <p class="text-sm text-gray-500 line-clamp-2">${listing.description || listing.location}</p>
    </div>`
  );

  // Create and add marker to map
  new mapboxgl.Marker(el)
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  // Add click event
  el.addEventListener('click', () => {
    navigate(`/listings/${listing.id}`);
  });

  return null;
};

export default MapMarker;