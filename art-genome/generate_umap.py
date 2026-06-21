import json
from pathlib import Path

import numpy as np
import umap

ARTWORKS_DIR = Path("content/artworks")
OUTPUT_DIR = Path("generated")

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

embeddings = np.array(embeddings)

print(
    f"Loaded {len(slugs)} embeddings"
)

reducer = umap.UMAP(
    n_neighbors=15,
    min_dist=0.1,
    random_state=42,
)

coordinates = reducer.fit_transform(
    embeddings
)

result = []

for slug, point in zip(slugs, coordinates):
    result.append(
        {
            "slug": slug,
            "x": float(point[0]),
            "y": float(point[1]),
        }
    )

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

with open(
    OUTPUT_DIR / "art-map.json",
    "w",
) as f:
    json.dump(
        result,
        f,
        indent=2,
    )

print(
    f"Generated coordinates for {len(result)} artworks"
)