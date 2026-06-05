"use client";

import Image from "next/image";
import ArtworkCard from "../components/artwork-cards";
import type { Artwork } from "@/types/artwork";
import { useState } from "react";
import { artworks } from "@/data/artworks";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArtworks =
  selectedCategory === "All"
    ? artworks
    : artworks.filter(
        (artwork) => artwork.category === selectedCategory
      );

  return (
    
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        Angel's Gallery
      </h1>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-white text-black"
              : "bg-zinc-800 text-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setSelectedCategory("Painting")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-white text-black"
              : "bg-zinc-800 text-white"
          }`}
        >
          Painting
        </button>

        <button
          onClick={() => setSelectedCategory("Printmaking")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-white text-black"
              : "bg-zinc-800 text-white"
          }`}
        >
          Printmaking
        </button>
    </div>

      <div className="grid grid-cols-3 gap-6">
      {filteredArtworks.map((artwork) => (
        <ArtworkCard
          slug={artwork.slug}
          key={artwork.slug}
          title={artwork.title}
          artist={artwork.artist}
          image={artwork.image}
          year={artwork.year}
          country={artwork.country}
        />
      ))}
    </div>
    </main>
  );
}