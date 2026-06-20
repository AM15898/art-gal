import Link from "next/link";
import Image from "next/image";

import { Artwork } from "@/types/artwork";

type Props = {
  artworks: Artwork[];
};

export default function SimilarArtworks({
  artworks,
}: Props) {
  if (!artworks.length) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4">
        Similar Artworks
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <Link
            key={artwork.slug}
            href={`/artwork/${artwork.slug}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={400}
                height={400}
                className="
                  w-full
                  aspect-square
                  object-cover
                  transition
                  group-hover:scale-105
                "
              />
            </div>

            <div className="mt-2">
              <p className="font-medium">
                {artwork.title}
              </p>

              <p className="text-sm text-gray-500">
                {artwork.artist}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}