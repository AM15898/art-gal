import fs from "fs";
import path from "path";

const ARTWORKS_DIR = path.join(
  process.cwd(),
  "content",
  "artworks"
);

const files = fs.readdirSync(ARTWORKS_DIR);

for (const file of files) {
  if (!file.endsWith(".json")) continue;

  const slug = file.replace(".json", "");

  const folderPath = path.join(
    ARTWORKS_DIR,
    slug
  );

  fs.mkdirSync(folderPath, { recursive: true });

  fs.renameSync(
    path.join(ARTWORKS_DIR, file),
    path.join(folderPath, "metadata.json")
  );

  console.log(`Moved ${file}`);
}

console.log("Done.");