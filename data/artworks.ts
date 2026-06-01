import { Artwork } from "@/types/artwork";

export const artworks: Artwork[] = [
  {
    slug: "the-kiss-klimt",
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1908,
    country: "Austria",
    category: "Painting",
    medium: "Oil and gold leaf",
    movement: "Art Nouveau",
    image: "/artworks/kiss-klimt.jpg",
    tags: ["love", "gold"],
    personal_note: "Beautiful use of gold.",
  },

  {
    slug: "starry-night-over-the-rhone",
    title: "The Starry Night Over the Rhône",
    artist: "Vincent van Gogh",
    year: 1888,
    country: "France",
    category: "Painting",
    medium: "Oil",
    movement: "Post-Impressionism",
    image: "/artworks/starrynightoverrhone-vangogh.jpg",
    tags: ["night", "water"],
    personal_note: "One of my favorite night paintings.",
  },

  {
    slug: "the-scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: 1893,
    country: "Norway",
    category: "Painting",
    medium: "Oil, tempera and pastel",
    movement: "Expressionism",
    image: "/artworks/thescream-munch.jpeg",
    tags: ["anxiety", "emotion"],
    personal_note: "Raw emotional intensity.",
  },

  {
    slug: "great-wave-off-kanagawa",
    title: "The Great Wave off Kanagawa",
    artist: "Hokusai",
    year: 1831,
    country: "Japan",
    category: "Printmaking",
    medium: "Woodblock Print",
    movement: "Ukiyo-e",
    image: "/artworks/thewave-hokusai.jpeg",
    tags: ["ocean", "japan"],
    personal_note: "The most iconic print ever made.",
  },
];