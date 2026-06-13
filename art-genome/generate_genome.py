from enrich_artwork import enrich_artwork

from utils.exporter import save_genome

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

IMAGE_PATH = (
    ROOT /
    "public" /
    "artworks" /
    "thewave-hokusai.jpeg"
)

TITLE = (
    "The Great Wave off Kanagawa"
)

genome = enrich_artwork(
    TITLE,
    str(IMAGE_PATH)
)

save_genome(
    genome,
    "output/thewave-hokusai.json"
)

print(
    "Genome generated successfully."
)