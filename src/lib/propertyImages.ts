export function getPropertyImages(property: any) {
  if (property.images && property.images.length > 0) return property.images;
  return [property.featuredImage];
}
