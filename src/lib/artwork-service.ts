import { artworks } from "@/data/artworks";

export async function getAllArtworks() {
  return artworks;
}

export async function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}