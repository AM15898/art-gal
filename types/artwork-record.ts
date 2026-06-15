import type {
  Artwork,
  ArtworkGenome,
} from "./artwork";

export interface ArtworkRecord {
  metadata: Artwork;
  genome?: ArtworkGenome;

  palette?: string[];
}