import Link from "next/link";
import Image from "next/image";

import { Artwork } from "@/types/artwork";

type ArtworkCardProps = {
  artwork: Artwork;
};

export default function ArtworkCard({
  artwork,
}: ArtworkCardProps) {
  return (
    <Link
      href={`/artwork/${artwork.slug}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-lg">

        <div className="relative aspect-[4/3]">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

      </div>

      <div className="mt-3">

        <h2 className="font-semibold">
          {artwork.title}
        </h2>

        <p className="text-sm text-zinc-400">
          {artwork.artist}
        </p>

      </div>
    </Link>
  );
}