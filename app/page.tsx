import { getAllArtworks } from "@/src/lib/artwork-service";
import HomePageClient from "@/components/home-page-client";

export default async function Page() {
  const artworks = await getAllArtworks();

  return (
    <HomePageClient
      artworks={artworks}
    />
  );
}