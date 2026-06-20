import json
from pathlib import Path

ARTWORKS_DIR = Path("content/artworks")

metadata_count = 0
genome_count = 0
embedding_count = 0

missing_metadata = []
missing_genome = []
missing_embedding = []

invalid_embeddings = []

for artwork_dir in ARTWORKS_DIR.iterdir():
    if not artwork_dir.is_dir():
        continue

    slug = artwork_dir.name

    metadata_path = artwork_dir / "metadata.json"
    genome_path = artwork_dir / "genome.json"
    embedding_path = artwork_dir / "embedding.json"

    if metadata_path.exists():
        metadata_count += 1
    else:
        missing_metadata.append(slug)

    if genome_path.exists():
        genome_count += 1
    else:
        missing_genome.append(slug)

    if embedding_path.exists():
        embedding_count += 1

        try:
            with open(embedding_path) as f:
                embedding = json.load(f)

            vector = embedding["vector"]

            if len(vector) != 512:
                invalid_embeddings.append(
                    f"{slug} ({len(vector)} dims)"
                )

        except Exception:
            invalid_embeddings.append(
                f"{slug} (failed to read)"
            )

    else:
        missing_embedding.append(slug)

total_artworks = len(
    [p for p in ARTWORKS_DIR.iterdir() if p.is_dir()]
)

print("\n=== COLLECTION HEALTH ===\n")

print(f"Artworks:   {total_artworks}")
print(f"Metadata:   {metadata_count}")
print(f"Genome:     {genome_count}")
print(f"Embedding:  {embedding_count}")

print()

if missing_metadata:
    print("Missing metadata:")
    for slug in missing_metadata:
        print(f"  - {slug}")

if missing_genome:
    print("Missing genome:")
    for slug in missing_genome:
        print(f"  - {slug}")

if missing_embedding:
    print("Missing embedding:")
    for slug in missing_embedding:
        print(f"  - {slug}")

if invalid_embeddings:
    print("Invalid embeddings:")
    for slug in invalid_embeddings:
        print(f"  - {slug}")

if (
    not missing_metadata
    and not missing_genome
    and not missing_embedding
    and not invalid_embeddings
):
    print("Collection healthy ✓")