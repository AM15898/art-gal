import { notFound } from "next/navigation";
import {
  getAllTags,
  getArtworksByTag,
} from "@/src/lib/tag-service";
import ArtworkCard from "@/components/ArtworkCard";

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const artworks = await getArtworksByTag(tag);
  
  console.log(
    artworks.map((artwork) => artwork.slug)
 );
  if (artworks.length === 0) {
    notFound();
  }

  return (
    <main>
      <h1>{tag}</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {artworks.map((artwork) => (
            <ArtworkCard
            key={artwork.slug}
            artwork={artwork}
            />
        ))}
        </div>
    </main>
  );
}