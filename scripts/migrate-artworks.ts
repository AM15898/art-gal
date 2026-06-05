// import fs from "fs";
// import path from "path";

// import { artworks } from "../data/artworks";

// const outputDir = path.join(
//   process.cwd(),
//   "content",
//   "artworks"
// );

// fs.mkdirSync(outputDir, {
//   recursive: true,
// });

// for (const artwork of artworks) {
//   const filePath = path.join(
//     outputDir,
//     `${artwork.slug}.json`
//   );

//   if (fs.existsSync(filePath)) {
//     console.log(
//       `⏭ Skipping ${artwork.slug}`
//     );
//     continue;
//   }

//   fs.writeFileSync(
//     filePath,
//     JSON.stringify(artwork, null, 2)
//   );

//   console.log(
//     `✅ Created ${artwork.slug}.json`
//   );
// }