import json
from pathlib import Path

import numpy as np


ARTWORKS_DIR = Path("content/artworks")
OUTPUT_DIR = Path("../generated")
OUTPUT_FILE = OUTPUT_DIR / "similar-artworks.json"

TOP_K = 5


def load_embeddings():
    artworks = {}

    for artwork_dir in ARTWORKS_DIR.iterdir():
        if not artwork_dir.is_dir():
            continue

        embedding_path = artwork_dir / "embedding.json"

        if not embedding_path.exists():
            continue

        with open(embedding_path, "r") as f:
            data = json.load(f)

        artworks[artwork_dir.name] = np.array(data["vector"])

    return artworks


def cosine_similarity(a, b):
    return np.dot(a, b) / (
        np.linalg.norm(a) * np.linalg.norm(b)
    )


def generate_similarity_cache(artworks):
    result = {}

    slugs = list(artworks.keys())

    for slug in slugs:
        current_embedding = artworks[slug]

        similarities = []

        for other_slug in slugs:
            if slug == other_slug:
                continue

            score = cosine_similarity(
                current_embedding,
                artworks[other_slug]
            )

            similarities.append({
                "slug": other_slug,
                "score": round(float(score), 4)
            })

        similarities.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        result[slug] = similarities[:TOP_K]

    return result


def main():
    print("Loading embeddings...")

    artworks = load_embeddings()

    print(
        f"Loaded {len(artworks)} embeddings"
    )

    similarity_cache = generate_similarity_cache(
        artworks
    )

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            similarity_cache,
            f,
            indent=2
        )

    print(
        f"Saved similarity cache to {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()