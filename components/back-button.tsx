"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 rounded border px-4 py-2 hover:bg-gray-100"
    >
      ← Back
    </button>
  );
}