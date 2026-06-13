import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

ARTWORKS_DIR = (
    ROOT /
    "content" /
    "artworks"
)

PUBLIC_DIR = (
    ROOT /
    "public"
)

from enrich_artwork import (
    enrich_artwork
)

for artwork_dir in ARTWORKS_DIR.iterdir():

    if not artwork_dir.is_dir():
        continue

    metadata_path = (
        artwork_dir /
        "metadata.json"
    )

    if not metadata_path.exists():
        continue

    genome_path = (
        artwork_dir /
        "genome.json"
    )

    if genome_path.exists():
        print(
            f"Skipping {artwork_dir.name}"
        )
        continue

    metadata = json.loads(
        metadata_path.read_text()
    )

    title = metadata["title"]

    image_path = (
        PUBLIC_DIR /
        metadata["image"].lstrip("/")
    )

    print(
        f"Generating genome for {title}"
    )

    genome = enrich_artwork(
        title,
        str(image_path)
    )

    genome_path.write_text(
        genome.model_dump_json(indent=2)
    )

    print(
        f"Saved {genome_path}"
    )

    break  # Remove this to process all artworks