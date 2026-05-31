import { artworks } from "@/data/artworks";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const artwork = artworks.find(
    (a) => a.id === Number(id)
  );

  if (!artwork) {
    notFound();
 }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">

        <div className="relative aspect-[4/3] mb-8">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold">
          {artwork.title}
        </h1>

        <p className="text-zinc-400 mt-2">
          {artwork.artist}
        </p>

      </div>
    </main>
  );
}