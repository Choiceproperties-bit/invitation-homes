import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyListing } from '../types/rental';
import { supabaseClient } from '../lib/supabaseClient';

interface PropertyRecord {
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  market: string;
  monthly_rent: number;
  security_deposit: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  available_date: string | null;
  status: PropertyListing['status'];
  pet_friendly: boolean;
  pet_details: string;
  smart_home: boolean;
  smart_home_features: string[];
  amenities: string[];
  images: string[];
  featured_image: string;
  virtual_tour_url: string | null;
  floor_plan_image: string | null;
  latitude: number;
  longitude: number;
  year_built: number | null;
  parking_spaces: number | null;
  school_district: string | null;
  total_count?: number;
}

export interface ListingSearchParams {
  query: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minSqft: string;
  maxSqft: string;
  petFriendly: boolean;
  smartHome: boolean;
  sortOrder: string;
  page: number;
  pageSize: number;
}

export interface ListingSearchResult {
  listings: PropertyListing[];
  totalCount: number;
}

function mapProperty(record: PropertyRecord): PropertyListing {
  return {
    id: record.slug,
    title: record.title,
    address: record.address,
    city: record.city,
    state: record.state,
    zipCode: record.zip_code,
    market: record.market,
    monthlyRent: Number(record.monthly_rent),
    securityDeposit: Number(record.security_deposit),
    bedrooms: record.bedrooms,
    bathrooms: Number(record.bathrooms),
    squareFeet: record.square_feet,
    availableDate: record.available_date ?? 'Contact for availability',
    status: record.status,
    petFriendly: record.pet_friendly,
    petDetails: record.pet_details,
    smartHome: record.smart_home,
    smartHomeFeatures: record.smart_home_features,
    amenities: record.amenities,
    images: record.images,
    featuredImage: record.featured_image,
    virtualTourUrl: record.virtual_tour_url ?? undefined,
    floorPlanImage: record.floor_plan_image ?? undefined,
    coordinates: { lat: record.latitude, lng: record.longitude },
    yearBuilt: record.year_built ?? undefined,
    parkingSpaces: record.parking_spaces ?? undefined,
    schoolDistrict: record.school_district ?? undefined
  };
}

function searchFixtureListings(params: ListingSearchParams): ListingSearchResult {
  const matching = SAMPLE_PROPERTIES.filter((home) => {
    const queryMatches = !params.query || `${home.city} ${home.state} ${home.zipCode} ${home.address}`.toLowerCase().includes(params.query.toLowerCase());
    const bedsMatch = params.bedrooms === 'any' || home.bedrooms >= Number(params.bedrooms);
    const bathsMatch = params.bathrooms === 'any' || home.bathrooms >= Number(params.bathrooms);
    const minPriceMatch = !params.minPrice || home.monthlyRent >= Number(params.minPrice);
    const maxPriceMatch = !params.maxPrice || home.monthlyRent <= Number(params.maxPrice);
    const minSqftMatch = !params.minSqft || home.squareFeet >= Number(params.minSqft);
    const maxSqftMatch = !params.maxSqft || home.squareFeet <= Number(params.maxSqft);
    return queryMatches && bedsMatch && bathsMatch && minPriceMatch && maxPriceMatch && minSqftMatch && maxSqftMatch && (!params.petFriendly || home.petFriendly) && (!params.smartHome || home.smartHome);
  }).sort((first, second) => {
    if (params.sortOrder === 'price_asc') return first.monthlyRent - second.monthlyRent;
    if (params.sortOrder === 'price_desc') return second.monthlyRent - first.monthlyRent;
    if (params.sortOrder === 'beds_desc') return second.bedrooms - first.bedrooms;
    return 0;
  });

  const start = Math.max(0, params.page - 1) * params.pageSize;
  return { listings: matching.slice(start, start + params.pageSize), totalCount: matching.length };
}

export async function searchPropertyListings(params: ListingSearchParams): Promise<ListingSearchResult> {
  if (!supabaseClient) return searchFixtureListings(params);

  const { data, error } = await supabaseClient.rpc('search_public_properties', {
    p_query: params.query.trim() || null,
    p_min_price: params.minPrice ? Number(params.minPrice) : null,
    p_max_price: params.maxPrice ? Number(params.maxPrice) : null,
    p_bedrooms: params.bedrooms === 'any' ? null : Number(params.bedrooms),
    p_bathrooms: params.bathrooms === 'any' ? null : Number(params.bathrooms),
    p_min_sqft: params.minSqft ? Number(params.minSqft) : null,
    p_max_sqft: params.maxSqft ? Number(params.maxSqft) : null,
    p_pet_friendly: params.petFriendly,
    p_smart_home: params.smartHome,
    p_sort_order: params.sortOrder,
    p_page: params.page,
    p_page_size: params.pageSize
  });

  if (error) throw error;
  const rows = (data ?? []) as PropertyRecord[];
  return {
    listings: rows.map(mapProperty),
    totalCount: Number(rows[0]?.total_count ?? 0)
  };
}

export async function getPropertyBySlug(slug: string): Promise<PropertyListing | null> {
  if (!supabaseClient) return SAMPLE_PROPERTIES.find((property) => property.id === slug) ?? null;

  const { data, error } = await supabaseClient
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .in('status', ['available', 'pending', 'coming_soon'])
    .maybeSingle();

  if (error) throw error;
  return data ? mapProperty(data as PropertyRecord) : null;
}