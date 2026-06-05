import fs from "fs";
import path from "path";

import { artworks as legacyArtworks } from "@/data/artworks";
import type { Artwork } from "@/types/artwork";

function getJsonArtworks(): Artwork[] {
  const contentDir = path.join(
    process.cwd(),
    "content",
    "artworks"
  );

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(contentDir, file);

    return JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  });
}

export async function getAllArtworks(): Promise<Artwork[]> {
  return [
    ...legacyArtworks,
    ...getJsonArtworks(),
  ];
}

export async function getArtworkBySlug(
  slug: string
): Promise<Artwork | undefined> {
  const artworks = await getAllArtworks();

  return artworks.find(
    (artwork) => artwork.slug === slug
  );
}