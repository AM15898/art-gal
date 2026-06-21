"use client";

import Link from "next/link";
import { useState } from "react";

type Point = {
  slug: string;
  x: number;
  y: number;
  title?: string;
  artist?: string;
  image?: string;
};

export default function UniverseMap({
  points,
}: {
  points: Point[];
}) {

  const [hovered, setHovered] = useState<Point | null>(null);

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
      {hovered && (
        <div
            className="
            fixed
            top-4
            left-4
            bg-black
            text-white
            p-3
            rounded
            z-50
            shadow-lg
            "
        >
            <div className="font-bold">
            {hovered.title ?? hovered.slug}
            </div>

            <div className="text-sm opacity-75">
            {hovered.artist}

            <img
                src={hovered.image}
                alt={hovered.title}
                className="
                    w-32
                    h-32
                    object-cover
                    rounded
                    mb-2
                "
                />
            </div>
        </div>
        )}
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
              fill="#60A5FA"
              stroke="#60A5FA"
              strokeWidth={1}
              
              onMouseEnter={() =>
                setHovered(point)}

              onMouseLeave={() =>
                setHovered(null)}
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