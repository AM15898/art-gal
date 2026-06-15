import json
from pathlib import Path

from services.embedding_generator import (
    generate_embedding
)

CONTENT_DIR = Path(
    "content/artworks"
)

PUBLIC_DIR = Path(
    "public"
)


def main():

    folders = [
        p for p in CONTENT_DIR.iterdir()
        if p.is_dir()
    ]

    for folder in folders:

        metadata_path = (
            folder / "metadata.json"
        )

        if not metadata_path.exists():
            continue

        with open(
            metadata_path,
            "r",
            encoding="utf-8"
        ) as f:
            metadata = json.load(f)

        image_path = (
            PUBLIC_DIR /
            metadata["image"].lstrip("/")
        )

        print(
            f"Embedding {folder.name}"
        )

        embedding = generate_embedding(
            image_path
        )

        output_path = (
            folder / "embedding.json"
        )

        with open(
            output_path,
            "w",
            encoding="utf-8"
        ) as f:
            json.dump(
                embedding,
                f,
                indent=2
            )

    print(
        "Finished generating embeddings"
    )


if __name__ == "__main__":
    main()