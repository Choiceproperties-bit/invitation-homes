import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { APIProvider, AdvancedMarker, InfoWindow, Map as GoogleMap, useMap } from '@vis.gl/react-google-maps';
import { PropertyListing } from '../types/rental';

interface GoogleRentalMapProps {
  homes: PropertyListing[];
  selectedHomeId: string | null;
  onSelectHome: (homeId: string | null) => void;
}

function ClusteredHomes({ homes, selectedHomeId, onSelectHome }: GoogleRentalMapProps) {
  const map = useMap();
  const markers = useRef(new globalThis.Map<string, google.maps.marker.AdvancedMarkerElement>());
  const clusterer = useRef<MarkerClusterer | null>(null);
  const selectedHome = homes.find((home) => home.id === selectedHomeId);

  useEffect(() => {
    if (!map) return;
    const markerList = homes
      .map((home) => markers.current.get(home.id))
      .filter((marker): marker is google.maps.marker.AdvancedMarkerElement => Boolean(marker));
    if (clusterer.current) clusterer.current.clearMarkers();
    clusterer.current = new MarkerClusterer({ map, markers: markerList });
    return () => {
      clusterer.current?.clearMarkers();
      clusterer.current = null;
    };
  }, [homes, map]);

  useEffect(() => {
    if (!map || !selectedHome) return;
    map.panTo(selectedHome.coordinates);
    map.setZoom(Math.max(map.getZoom() ?? 0, 11));
  }, [map, selectedHome]);

  return (
    <>
      {homes.map((home) => (
        <AdvancedMarker
          key={home.id}
          ref={(marker) => {
            if (marker) markers.current.set(home.id, marker);
            else markers.current.delete(home.id);
          }}
          position={home.coordinates}
          title={`${home.address}, ${home.city}: $${home.monthlyRent.toLocaleString()} per month`}
          clickable
          onClick={() => onSelectHome(home.id)}
          zIndex={selectedHomeId === home.id ? 1000 : undefined}
        >
          <span className={`inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-full border-2 border-white px-3 text-xs font-bold text-white shadow-md ${selectedHomeId === home.id ? 'bg-[#0b763c] ring-2 ring-[#0b763c]/30' : 'bg-[#168241]'}`}>
            ${home.monthlyRent.toLocaleString()}
            <span className="sr-only">Select home at {home.address}, {home.city}</span>
          </span>
        </AdvancedMarker>
      ))}
      {selectedHome && markers.current.has(selectedHome.id) && (
        <InfoWindow
          anchor={markers.current.get(selectedHome.id)}
          onCloseClick={() => onSelectHome(null)}
          pixelOffset={[0, -4]}
        >
          <div className="max-w-56 p-1 text-[#231f20]">
            <p className="font-semibold">{selectedHome.address}</p>
            <p className="mt-1 text-xs">{selectedHome.city}, {selectedHome.state}</p>
            <p className="mt-1 text-sm font-bold text-[#168241]">${selectedHome.monthlyRent.toLocaleString()}/mo</p>
            <a href={`/houses-for-rent/${selectedHome.id}`} className="mt-2 inline-block text-xs font-semibold text-[#168241] underline">View home</a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapUnavailable() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-[#f3f5f1] p-6 text-center">
      <div className="max-w-sm">
        <p className="font-semibold text-[#231f20]">Map unavailable</p>
        <p className="mt-2 text-sm leading-6 text-[#555]">Set <code>VITE_GOOGLE_MAPS_API_KEY</code> to enable the interactive map. Restrict the key to this application’s authorized domains.</p>
      </div>
    </div>
  );
}

export function GoogleRentalMap(props: GoogleRentalMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
  const [loadFailed, setLoadFailed] = useState(false);
  const homes = props.homes.filter((home) => Number.isFinite(home.coordinates.lat) && Number.isFinite(home.coordinates.lng));

  if (!apiKey || loadFailed) return <MapUnavailable />;

  const center = homes[0]?.coordinates ?? { lat: 33.748995, lng: -84.387982 };
  const bounds = homes.reduce<google.maps.LatLngBoundsLiteral | undefined>((current, home) => {
    if (!current) return { north: home.coordinates.lat, south: home.coordinates.lat, east: home.coordinates.lng, west: home.coordinates.lng };
    return {
      north: Math.max(current.north, home.coordinates.lat),
      south: Math.min(current.south, home.coordinates.lat),
      east: Math.max(current.east, home.coordinates.lng),
      west: Math.min(current.west, home.coordinates.lng)
    };
  }, undefined);

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-[#edf1ea] lg:min-h-[560px]">
      <APIProvider apiKey={apiKey} onError={() => setLoadFailed(true)}>
        <GoogleMap
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID'}
          defaultCenter={center}
          defaultZoom={11}
          defaultBounds={homes.length > 1 ? bounds : undefined}
          mapTypeControl
          fullscreenControl
          streetViewControl
          zoomControl
          clickableIcons={false}
          gestureHandling="greedy"
          style={{ width: '100%', height: '100%' }}
        >
          <ClusteredHomes {...props} homes={homes} />
        </GoogleMap>
      </APIProvider>
      <span className="pointer-events-none absolute left-3 top-3 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-[#333] shadow">{homes.length} homes on map</span>
    </div>
  );
}