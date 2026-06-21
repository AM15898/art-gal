import fs from "fs";
import path from "path";

export type SimilarArtworkResult = {
  slug: string;
  score: number;
};

const similarityPath = path.join(
  process.cwd(),
  "generated",
  "similar-artworks.json"
);

export function getSimilarArtworkSlugs(
  slug: string
): SimilarArtworkResult[] {
  if (!fs.existsSync(similarityPath)) {
    return [];
  }

  const data = JSON.parse(
    fs.readFileSync(similarityPath, "utf8")
  );

  return data[slug] || [];
}