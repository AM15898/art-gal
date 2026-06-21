import fs from "fs";
import path from "path";

import { UniversePoint } from "@/types/universe";

const mapPath = path.join(
  process.cwd(),
  "generated",
  "art-map.json"
);

export function getUniverseMap(): UniversePoint[] {
  if (!fs.existsSync(mapPath)) {
    return [];
  }

  return JSON.parse(
    fs.readFileSync(mapPath, "utf8")
  );
}