import type { Artwork } from "./artwork";

export interface ArtworkRecord {
  metadata: Artwork;
  genome?: unknown;
}