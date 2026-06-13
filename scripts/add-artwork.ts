import fs from "fs";
import path from "path";
import prompts from "prompts";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "image",
      message: "Image filename:",
    },
    {
      type: "text",
      name: "title",
      message: "Title:",
    },
    {
      type: "text",
      name: "artist",
      message: "Artist:",
    },
    {
      type: "text",
      name: "countrySlug",
      message: "countrySlug:",
    },
    {
      type: "text",
      name: "tags",
      message: "Tags (comma separated):",
    },
  ]);

  const imagePath = path.join(
    process.cwd(),
    "public",
    "artworks",
    response.image
);

    if (!fs.existsSync(imagePath)) {
    console.log(
        "❌ Image not found in public/artworks"
    );
    return;
    }

  const filenameWithoutExtension = response.image.replace(/\.[^/.]+$/, "");
    
  const slug = slugify(filenameWithoutExtension);

  const artwork = {
    slug,

    title: response.title,
    artist: response.artist,

    year: undefined,

    countrySlug: response.countrySlug,

    category: "",

    medium: "",
    movement: "",

    image: `/artworks/${response.image}`,

    tags: response.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter(Boolean),

    description: "",

    personal_note: "",

    why_i_like_it: "",

    museum: "",
    museum_location: "",

    source_url: "",

    related_artworks: [],

    date_added: new Date()
        .toISOString()
        .split("T")[0],

    mood: [],
 };

  const artworkDir = path.join(
    process.cwd(),
    "content",
    "artworks",
    slug
    );

    const outputFile = path.join(
    artworkDir,
    "metadata.json"
    );

    if (fs.existsSync(artworkDir)) {
    console.log("❌ Artwork already exists.");
    return;
    }

    fs.mkdirSync(artworkDir, {
    recursive: true,
    });

  fs.writeFileSync(
    outputFile,
    JSON.stringify(artwork, null, 2)
  );

   console.log(`✅ Created ${slug}/metadata.json`);
}

main();