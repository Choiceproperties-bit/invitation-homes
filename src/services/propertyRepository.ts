import { SAMPLE_PROPERTIES } from '../data/properties';
import { PropertyListing } from '../types/rental';
import { supabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';

export async function getPropertyBySlug(slug: string): Promise<PropertyListing | null> {
  const found = SAMPLE_PROPERTIES.find(p => p.id === slug || p.title.toLowerCase().includes(slug.replace(/-/g, ' ')));
  return found || SAMPLE_PROPERTIES[0];
}

export async function searchPropertyListings(params: any): Promise<{ properties: PropertyListing[]; listings: PropertyListing[]; totalCount: number }> {
  return {
    properties: SAMPLE_PROPERTIES,
    listings: SAMPLE_PROPERTIES,
    totalCount: SAMPLE_PROPERTIES.length
  };
}
