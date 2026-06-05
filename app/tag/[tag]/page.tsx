import { notFound } from "next/navigation";
import {
  getAllTags,
  getArtworksByTag,
} from "@/src/lib/tag-service";

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

  if (artworks.length === 0) {
    notFound();
  }

  return (
    <main>
      <h1>{tag}</h1>

      <p>{artworks.length} artworks</p>
    </main>
  );
}