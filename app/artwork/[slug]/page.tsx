import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtworkBySlug } from "@/src/lib/artwork-service";
import BackButton from "@/components/back-button";
import Link from "next/link";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
 }

  return (
    
  <main className="min-h-screen bg-black text-white px-6 py-12">
    <BackButton />
    <div className="max-w-5xl mx-auto">

      {/* Artwork Image */}
      <div className="relative aspect-[4/3] mb-10">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-2">
        {artwork.title}
      </h1>

      {/* Artist + Year */}
      <p className="text-xl text-zinc-400 mb-8">
        {artwork.artist}
        {artwork.year && ` · ${artwork.year}`}
      </p>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-sm">

        {artwork.country && (
          <div>
            <span className="text-zinc-500">
              Country:
            </span>{" "}
            {artwork.country}
          </div>
        )}

        {artwork.movement && (
          <div>
            <span className="text-zinc-500">
              Movement:
            </span>{" "}
            {artwork.movement}
          </div>
        )}

        {artwork.medium && (
          <div>
            <span className="text-zinc-500">
              Medium:
            </span>{" "}
            {artwork.medium}
          </div>
        )}

        {artwork.category && (
          <div>
            <span className="text-zinc-500">
              Category:
            </span>{" "}
            {artwork.category}
          </div>
        )}

      </div>

      {/* Tags */}
      {artwork.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {artwork.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase()}`}
                className="rounded-md border px-2 py-1 text-sm hover:bg-gray-100"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {artwork.description && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Description
          </h2>

          <p className="text-zinc-300 leading-relaxed">
            {artwork.description}
          </p>
        </section>
      )}

      {/* Why I Like It */}
      {artwork.why_i_like_it && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Why I Like It
          </h2>

          <p className="text-zinc-300 leading-relaxed">
            {artwork.why_i_like_it}
          </p>
        </section>
      )}

      {/* Personal Notes */}
      {artwork.personal_note && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Personal Notes
          </h2>

          <p className="text-zinc-300 leading-relaxed">
            {artwork.personal_note}
          </p>
        </section>
      )}

      {/* Museum */}
      {(artwork.museum || artwork.museum_location) && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Museum
          </h2>

          {artwork.museum && (
            <p>{artwork.museum}</p>
          )}

          {artwork.museum_location && (
            <p className="text-zinc-400">
              {artwork.museum_location}
            </p>
          )}
        </section>
      )}

      {/* Source */}
      {artwork.source_url && (
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Source
          </h2>

          <a
            href={artwork.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Learn More
          </a>
        </section>
      )}

    </div>
  </main>
  );
}