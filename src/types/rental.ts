export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  market: string;
  monthlyRent: number;
  securityDeposit: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  availableDate: string;
  status: 'available' | 'pending' | 'leased';
  petFriendly: boolean;
  petDetails: string;
  smartHome: boolean;
  smartHomeFeatures: string[];
  amenities: string[];
  images: string[];
  featuredImage: string;
  virtualTourUrl?: string;
  floorPlanImage?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  yearBuilt?: number;
  parkingSpaces?: number;
  schoolDistrict?: string;
}

export interface SearchFilterState {
  query: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'any', '3', '4', '5'
  bathrooms: string; // 'any', '2', '3'
  petFriendlyOnly: boolean;
  smartHomeOnly: boolean;
  hasPool: boolean;
  hasFencedYard: boolean;
}

export interface LeaseApplicationForm {
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentAddress: string;
  monthlyIncome: number;
  employer: string;
  jobTitle: string;
  moveInDate: string;
  hasPets: boolean;
  petCount: number;
  agreeToBackgroundCheck: boolean;
}

export interface TourBookingRequest {
  propertyId: string;
  propertyTitle: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  tourDate: string;
  tourTimeSlot: string;
  tourType: 'self_guided' | 'virtual' | 'agent_guided';
}
