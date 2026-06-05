import { getAllArtworks } from "@/src/lib/artwork-service";

export async function getAllTags(): Promise<string[]> {
  const artworks = await getAllArtworks();

  const tags = new Set<string>();

  artworks.forEach((artwork) => {
    artwork.tags?.forEach((tag) => {
      tags.add(tag.toLowerCase());
    });
  });

  return Array.from(tags).sort();
}

export async function getArtworksByTag(tag: string) {
  const artworks = await getAllArtworks();

  return artworks.filter((artwork) =>
    artwork.tags?.some(
      (artworkTag) =>
        artworkTag.toLowerCase() === tag.toLowerCase()
    )
  );
}