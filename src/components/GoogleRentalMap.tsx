import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertyListing } from '../types/rental';

interface KeylessMapProps {
  homes: PropertyListing[];
  selectedHomeId: string | null;
  onSelectHome: (homeId: string | null) => void;
}

export function GoogleRentalMap({ homes, selectedHomeId, onSelectHome }: KeylessMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Calculate center based on homes or default to Atlanta
  const centerLat = homes.length > 0 ? homes[0].latitude : 33.749;
  const centerLng = homes.length > 0 ? homes[0].longitude : -84.388;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 11,
        zoomControl: true,
        attributionControl: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = L.latLngBounds([]);

    homes.forEach((home) => {
      bounds.extend([home.latitude, home.longitude]);
      const isSelected = home.id === selectedHomeId;

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: ${isSelected ? '#0b763c' : '#168241'}; color: white; padding: 4px 8px; border-radius: 20px; font-weight: bold; font-size: 11px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); white-space: nowrap; border: 2px solid ${isSelected ? '#fff' : 'transparent'}; transform: scale(${isSelected ? 1.15 : 1}); transition: transform 0.2s;">$${home.monthlyRent.toLocaleString()}</div>`,
        iconSize: [60, 28],
        iconAnchor: [30, 14]
      });

      const marker = L.marker([home.latitude, home.longitude], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectHome(home.id);
      });

      markersRef.current.push(marker);
    });

    if (homes.length > 0 && !selectedHomeId) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (selectedHomeId) {
      const selected = homes.find(h => h.id === selectedHomeId);
      if (selected) {
        map.setView([selected.latitude, selected.longitude], 13, { animate: true });
      }
    }
  }, [homes, selectedHomeId]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-10" />
      <style>{`
        .leaflet-container {
          font-family: inherit;
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}