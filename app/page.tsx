import Image from "next/image";
import ArtworkCard from "../components/artwork-cards";
import { artworks } from "@/data/artworks";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-8">
        Angel's Gallery
      </h1>

      <div className="grid grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
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