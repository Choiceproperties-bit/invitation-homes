import React from 'react';
import { PropertyListing } from '../types/rental';

interface KeylessMapProps {
  homes: PropertyListing[];
  selectedHomeId: string | null;
  onSelectHome: (homeId: string | null) => void;
}

export function GoogleRentalMap({ homes, selectedHomeId, onSelectHome }: KeylessMapProps) {
  return (
    <div className="relative w-full h-full min-h-[450px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#04a54f] flex items-center justify-center font-extrabold text-lg mb-3 shadow-sm">
        🗺️
      </div>
      <h3 className="text-base font-extrabold text-[#231f20]">Interactive Map View</h3>
      <p className="text-xs text-slate-600 max-w-sm mt-1">
        Displaying {homes.length} available rental homes across the region. Click any home card on the left to highlight its location.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-md">
        {homes.slice(0, 5).map((home) => (
          <button
            key={home.id}
            onClick={() => onSelectHome(home.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm ${
              selectedHomeId === home.id
                ? 'bg-[#04a54f] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {home.city} • ${home.monthlyRent.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}
