export type Artwork = {
  slug: string;

  title: string;
  artist: string;
  year?: number;

  countrySlug?: string;
  category?: string;
  medium?: string;
  movement?: string;

  image: string;

  tags: string[];

  personal_note?: string;

  description?: string;

  why_i_like_it?: string;

  museum?: string;

  museum_location?: string;

  source_url?: string;

  related_artworks?: string[];

  date_added?: string;
  mood?: string[];
};