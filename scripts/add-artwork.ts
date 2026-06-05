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
      name: "country",
      message: "Country:",
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

  const slug = slugify(
    `${response.title}-${response.artist}`
  );

  const artwork = {
    slug,
    title: response.title,
    artist: response.artist,

    image: `/artworks/${response.image}`,

    country: response.country,

    tags: response.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean),

    description: "",
    personal_note: "",
    why_i_like_it: "",
  };

  const outputDir = path.join(
    process.cwd(),
    "content",
    "artworks"
  );

  fs.mkdirSync(outputDir, {
    recursive: true,
  });

  const outputFile = path.join(
    outputDir,
    `${slug}.json`
  );

  if (fs.existsSync(outputFile)) {
    console.log("❌ Artwork already exists.");
    return;
  }

  fs.writeFileSync(
    outputFile,
    JSON.stringify(artwork, null, 2)
  );

  console.log(`✅ Created ${slug}.json`);
}

main();