import { countries } from "@/data/countries";
import { getAllArtworks } from "@/src/lib/artwork-service";

export function getAllCountries() {
  return countries;
}

export function getCountryBySlug(slug: string) {
  return countries.find(
    (country) => country.slug === slug
  );
}

export async function getArtworksByCountry(
  countrySlug: string
) {
  const artworks = await getAllArtworks();

  return artworks.filter(
    (artwork) =>
      artwork.countrySlug === countrySlug
  );
}

export async function getCountryCounts() {
  const artworks = await getAllArtworks();

  return countries.map((country) => ({
    slug: country.slug,

    count: artworks.filter(
      (artwork) =>
        artwork.countrySlug === country.slug
    ).length,
  }));
}

export async function getCountriesWithCounts() {
  const artworks = await getAllArtworks();

  return countries.map((country) => ({
    ...country,

    count: artworks.filter(
      (artwork) =>
        artwork.countrySlug === country.slug
    ).length,
  }));
}