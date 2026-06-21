import json
from pathlib import Path

import numpy as np
import umap

ARTWORKS_DIR = Path("content/artworks")
OUTPUT_DIR = Path("generated")
OUTPUT_FILE = OUTPUT_DIR / "art-map.json"


def load_embeddings():
    embeddings = []
    slugs = []

    for artwork_dir in ARTWORKS_DIR.iterdir():
        if not artwork_dir.is_dir():
            continue

        embedding_path = artwork_dir / "embedding.json"

        if not embedding_path.exists():
            continue

        with open(embedding_path) as f:
            data = json.load(f)

        embeddings.append(data["vector"])
        slugs.append(artwork_dir.name)

    return np.array(embeddings), slugs


def main():
    embeddings, slugs = load_embeddings()

    print(
        f"Loaded {len(slugs)} embeddings"
    )

    reducer = umap.UMAP(
        n_neighbors=15,
        min_dist=0.1,
        metric="cosine",
        random_state=42,
    )

    coordinates = reducer.fit_transform(
        embeddings
    )

    result = []

    for slug, point in zip(slugs, coordinates):
        metadata_path = (
            ARTWORKS_DIR
            / slug
            / "metadata.json"
        )

        title = slug
        artist = ""
        image = ""

        if metadata_path.exists():
            with open(metadata_path) as f:
                metadata = json.load(f)

            title = metadata.get(
                "title",
                slug,
            )

            artist = metadata.get(
                "artist",
                "",
            )

            image = metadata.get(
                "image",
                "",
            )

        result.append(
            {
                "slug": slug,
                "title": title,
                "artist": artist,
                "image": image,
                "x": round(float(point[0]), 4),
                "y": round(float(point[1]), 4),
            })

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    with open(OUTPUT_FILE, "w") as f:
        json.dump(
            result,
            f,
            indent=2,
        )

    print(
        f"Generated {len(result)} coordinates"
    )

    print(
        f"Saved to {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()