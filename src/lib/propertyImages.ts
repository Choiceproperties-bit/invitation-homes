export function getPropertyImages(images: string[], featuredImage: string) {
  if (images && images.length > 0) return images;
  return [featuredImage];
}
