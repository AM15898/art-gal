import { artworks } from "@/data/artworks";

export function getAllArtworks() {
  return artworks;
}

export function getArtworkBySlug(slug: string) {
  return artworks.find(
    (artwork) => artwork.slug === slug
  );
}

export function getRelatedArtworks(
  slug: string,
  limit: number = 6
) {
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    return [];
  }

  const related = artworks
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        artwork.tags.includes(tag)
      );

      return {
        artwork: candidate,
        score: sharedTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.artwork);

  return related;
}