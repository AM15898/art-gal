import json
from pathlib import Path

from color_genome import generate_genome


CONTENT_DIR = Path("content/artworks")
PUBLIC_DIR = Path("public")


def main():
    folders = [
        p for p in CONTENT_DIR.iterdir()
        if p.is_dir()
    ]

    for folder in folders:

        metadata_file = folder / "metadata.json"

        if not metadata_file.exists():
            continue

        with open(metadata_file, "r") as f:
            metadata = json.load(f)

        image_path = PUBLIC_DIR / metadata["image"].lstrip("/")

        print(f"Generating genome for {folder.name}")

        genome = generate_genome(image_path)

        genome_file = folder / "genome.json"

        with open(genome_file, "w") as f:
            json.dump(genome, f, indent=2)

    print("Finished generating genomes")


if __name__ == "__main__":
    main()