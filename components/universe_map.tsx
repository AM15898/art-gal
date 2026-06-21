"use client";

import Link from "next/link";

type Point = {
  slug: string;
  x: number;
  y: number;
};

export default function UniverseMap({
  points,
}: {
  points: Point[];
}) {
  const width = 1200;
  const height = 800;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const normalizeX = (x: number) =>
    ((x - minX) / (maxX - minX)) * width;

  const normalizeY = (y: number) =>
    ((y - minY) / (maxY - minY)) * height;

  return (
    <div className="overflow-auto border rounded-lg">
      <svg
        width={width}
        height={height}
      >
        {points.map((point) => (
          <Link
            key={point.slug}
            href={`/artwork/${point.slug}`}
          >
            <circle
              cx={normalizeX(point.x)}
              cy={normalizeY(point.y)}
              r={4}
            >
              <title>
                {point.slug}
              </title>
            </circle>
          </Link>
        ))}
      </svg>
    </div>
  );
}