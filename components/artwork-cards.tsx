import Image from 'next/image';
import Link from "next/link";
import ColorSpectrum from './ColorSpectrum';

type ArtworkCardProps = {
  title: string;
  artist: string;
  image: string;
  year?: number;
  countrySlug?: string;
  slug: string;
  palette?: {
    hex: string;
    percentage: number;
    }[];
};

export default function ArtworkCard({
  slug,
  title,
  artist,
  image,
  year,
  countrySlug,
  palette
}: ArtworkCardProps) {
  return (
    <Link href={`/artwork/${slug}`}>
        <div className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition">
        <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
            />
            </div>
        <h2 className="text-white font-medium">
            {title}
        </h2>

        <p className="text-zinc-400 text-sm">
            {artist}
        </p>

        <p className="text-zinc-500 text-xs mt-1">
            {countrySlug ?? "Unknown"} · {year ?? "Date unknown"}
        </p>

        {palette && <ColorSpectrum palette={palette} />}

        </div>
    </Link>
  );
}