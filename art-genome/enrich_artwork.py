import json
from pathlib import Path

from builders.genome_builder import build_genome

from prompts.artwork_prompts import (
    build_artwork_prompt
)

from services.vision_analyzer import (
    analyze_artwork
)

from utils.image_metrics import (
    compute_brightness,
    compute_colorfulness
)


ARTWORK_JSON = (
    "../content/artworks/great-wave-off-kanagawa.json"
)

with open(ARTWORK_JSON, "r") as f:
    artwork = json.load(f)

title = artwork["title"]

image_path = (
    "../public/artworks/thewave-hokusai.jpeg"
)

brightness = compute_brightness(
    image_path
)

colorfulness = compute_colorfulness(
    image_path
)

prompt = build_artwork_prompt(
    title
)

analysis = analyze_artwork(
    image_path,
    prompt
)

genome = build_genome(
    title,
    analysis,
    brightness,
    colorfulness
)

artwork["genome"] = (
    genome.model_dump()
)

with open(
    ARTWORK_JSON,
    "w"
) as f:
    json.dump(
        artwork,
        f,
        indent=2
    )

print(
    "Genome added successfully."
)