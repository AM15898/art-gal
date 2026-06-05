import fs from "fs";
import path from "path";
import { artworks } from "../data/artworks";

const artworkDir = path.join(
  process.cwd(),
  "public",
  "artworks"
);

const imageFiles = fs.readdirSync(artworkDir);

const existingSlugs = new Set(
  artworks.map((artwork) => artwork.slug)
);

const missingArtworks: string[] = [];

for (const file of imageFiles) {
  const slug = file.replace(/\.[^/.]+$/, "");

  if (!existingSlugs.has(slug)) {
    missingArtworks.push(file);
  }
}

if (missingArtworks.length === 0) {
  console.log("✅ All artwork images have metadata.");
} else {
  console.log("\nMissing metadata:\n");

  missingArtworks.forEach((file) => {
    console.log(`- ${file}`);
  });
}