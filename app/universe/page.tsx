import UniverseMap from "@/components/universe_map";

import {
  getUniverseMap,
} from "@/src/lib/universe-service";

export default function UniversePage() {
  const points = getUniverseMap();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Art Universe
      </h1>

      <UniverseMap points={points} />
    </main>
  );
}