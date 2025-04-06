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
          const rank = restaurants.indexOf(restaurant) + 1;
            const marker = L.marker([lat, lng], {
              icon: L.divIcon({
                html: `<div style="background: #1c77c8; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; justify-content: center; align-items: center; font-weight: bold;">${rank}</div>`,
                className: '',
                iconSize: [24, 32]
              })
            }).addTo(map)
            .on('click', function() {
              const icon = this.getElement()?.querySelector('div');
              if (icon) {
                icon.style.background = '#ff0000';
                icon.style.borderRadius = '50%';
              }
            })
            .on('popupclose', function() {
              const icon = this.getElement()?.querySelector('div');
              if (icon) {
                icon.style.background = '#1c77c8';
                icon.style.borderRadius = '50%';
              }
            })
            .bindTooltip(restaurant.name, {
              permanent: true,
              direction: 'top',
              className: 'custom-tooltip',
              offset: [20, -10]
            })
            .bindPopup(`
              <div style="min-width: 200px">
                <h3 style="display: flex; align-items: center;"><img src="${restaurant.logoUrl}" alt="logo" style="height: 25px; margin-right: 5px;" />&nbsp;&nbsp;${restaurant.name}</h3>
                <h3><b> ⭐&nbsp;/&nbsp;🚹:&nbsp;&nbsp; ${restaurant.rating.starRating.toFixed(1)}&nbsp;/&nbsp;${restaurant.rating.count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🏆&nbsp;:&nbsp;&nbsp;${restaurants.indexOf(restaurant) + 1}&nbsp;/&nbsp;10</b></h3>
                <p>Address: ${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}</p>
                <p>Cuisines: ${Array.isArray(restaurant.cuisines) ? restaurant.cuisines.map(c => c.name).join(', ') : JSON.stringify(restaurant.cuisines)}</p>
              </div>
            `, {offset: [5, -5]});
        }
      });

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