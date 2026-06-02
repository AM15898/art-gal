import { artworks } from "@/data/artworks";

export function getAllArtworks() {
  return artworks;
}

export function getArtworkBySlug(slug: string) {
  return artworks.find(
    (artwork) => artwork.slug === slug
  );
}