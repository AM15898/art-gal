// import fs from "fs";
// import path from "path";

// const artworkDir = path.join(
//   process.cwd(),
//   "public",
//   "artworks"
// );

// const imageFiles = fs.readdirSync(artworkDir);

// const existingSlugs = new Set(
//   artworks.map((artwork) => artwork.slug)
// );

// const missingArtworks: string[] = [];

// for (const file of imageFiles) {
//   const slug = file.replace(/\.[^/.]+$/, "");

//   if (!existingSlugs.has(slug)) {
//     missingArtworks.push(file);
//   }
// }

// if (missingArtworks.length === 0) {
//   console.log("✅ All artwork images have metadata.");
// } else {
//   console.log("\nMissing metadata:\n");

//   missingArtworks.forEach((file) => {
//     console.log(`- ${file}`);
//   });
// }

import fs from "fs";
import path from "path";

const artworkDir = path.join(process.cwd(), "public", "artworks");
const contentDir = path.join(process.cwd(), "content", "artworks");

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

const files = fs.readdirSync(artworkDir);

let created = 0;
let skipped = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (!imageExtensions.includes(ext)) continue;

  const slug = path.basename(file, ext);

  const artworkFolder = path.join(
    contentDir,
    slug
  );

  const metadataPath = path.join(
    artworkFolder,
    "metadata.json"
  );

  if (fs.existsSync(metadataPath)) {
    skipped++;
    continue;
  }

  fs.mkdirSync(artworkFolder, {
    recursive: true,
  });

  const metadata = {
    slug,
    title: titleFromSlug(slug),
    artist: "",
    year: null,
    countrySlug: "",
    category: "Painting",
    medium: "",
    movement: "",
    image: `/artworks/${file}`,
    tags: [],
    personal_note: "",
  };

  fs.writeFileSync(
    metadataPath,
    JSON.stringify(metadata, null, 2)
  );

  created++;
  console.log(`Created ${slug}`);
}

console.log("");
console.log(`Created: ${created}`);
console.log(`Skipped: ${skipped}`);