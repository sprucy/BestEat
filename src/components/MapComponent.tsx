import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '../types';

interface MapComponentProps {
  restaurants: Restaurant[];
}

export default function MapComponent({ restaurants }: MapComponentProps) {
  useEffect(() => {
    console.log('Initializing map...');
    const map = L.map('map').setView([54.5, -2.5], 5);
    console.log('Map initialized:', map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    if (restaurants.length > 0) {
      const bounds = L.latLngBounds([]);
      
      restaurants.forEach(restaurant => {
        if (restaurant.address.location?.coordinates) {
          const [lng, lat] = restaurant.address.location.coordinates;
          bounds.extend([lat, lng]);
          const marker = L.marker([lat, lng])
            .addTo(map)
            .bindTooltip(`#Top${restaurants.indexOf(restaurant) + 1}:  ${restaurant.name}`, { 
              permanent: true, 
              direction: 'top', 
              className: 'permanent-label', 
              offset: [0, -10],
              opacity: 0.9
            })
            .bindPopup(`
              <div style="min-width: 200px">
                <h3 style="display: flex; align-items: center;"><img src="${restaurant.logoUrl}" alt="logo" style="height: 25px; margin-right: 5px;" />&nbsp;&nbsp;${restaurant.name}</h3>
                <h3><b> ⭐&nbsp;&nbsp;/&nbsp;&nbsp;🚹:&nbsp;&nbsp; ${restaurant.rating.starRating}&nbsp;&nbsp;/&nbsp;&nbsp;${restaurant.rating.count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🏆&nbsp;&nbsp;: ${restaurants.indexOf(restaurant) + 1}&nbsp;&nbsp;/&nbsp;&nbsp;10</b></h3>
                <p>Address: ${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}</p>
                <p>Cuisines: ${Array.isArray(restaurant.cuisines) ? restaurant.cuisines.map(c => c.name).join(', ') : JSON.stringify(restaurant.cuisines)}</p>
              </div>
            `);
        }
      });
      console.log('Bounds:', bounds);
      if (!bounds.isValid()) {
        map.setView([54.5, -2.5], 5);
      } else {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    return () => {
      map.remove();
    };
  }, [restaurants]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
}