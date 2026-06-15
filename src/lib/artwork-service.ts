import fs from "fs";
import path from "path";

import type { Artwork } from "@/types/artwork";

import type { ArtworkRecord } from "@/types/artwork-record";

function getJsonArtworks(): Artwork[] {
  const contentDir = path.join(
    process.cwd(),
    "content",
    "artworks"
  );

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const artworkFolders = fs
    .readdirSync(contentDir, {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  return artworkFolders.map((folder) => {
    const metadataPath = path.join(
      contentDir,
      folder,
      "metadata.json"
    );

    return JSON.parse(
      fs.readFileSync(metadataPath, "utf8")
    );
  });
}

export async function getAllArtworks(): Promise<Artwork[]> {
  return getJsonArtworks();
}

export async function getArtworkBySlug(
  slug: string
): Promise<Artwork | undefined> {

  const record = getArtworkRecord(slug);

  if (!record) {
    return undefined;
  }

  return {
    ...record.metadata,
    genome: record.genome,
  };
}

export function getArtworkRecord(
  slug: string
): ArtworkRecord | undefined {
  const artworkDir = path.join(
    process.cwd(),
    "content",
    "artworks",
    slug
  );

  const metadataPath = path.join(
    artworkDir,
    "metadata.json"
  );

  if (!fs.existsSync(metadataPath)) {
    return undefined;
  }

  const metadata = JSON.parse(
    fs.readFileSync(metadataPath, "utf8")
  );

  const genomePath = path.join(
    artworkDir,
    "genome.json"
  );

  let genome;

  if (fs.existsSync(genomePath)) {
    genome = JSON.parse(
      fs.readFileSync(genomePath, "utf8")
    );
  }

  return {
    metadata,
    genome,
  };
}