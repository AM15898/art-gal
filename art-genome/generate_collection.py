
import os
from utils.exporter import save_genome
from utils.image_metrics import (
    compute_brightness,
    compute_colorfulness
)
from services.vision_analyzer import (
    analyze_artwork
)
from prompts.artwork_prompts import (
    build_artwork_prompt
)
from builders.genome_builder import (
    build_genome
)

from pathlib import Path

ARTWORK_DIR = Path("../content/artworks")

for filename in os.listdir("input"):

    if not filename.lower().endswith(
        (".jpg", ".jpeg", ".png")
    ):
        continue

    image_path = os.path.join(
        "input",
        filename
    )

    title = (
        filename
        .replace(".jpg", "")
        .replace(".jpeg", "")
        .replace(".png", "")
        .replace("-", " ")
        .title()
    )

    print(
        f"Analyzing {title}"
    )

    brightness = compute_brightness(
        image_path
    )

    colorfulness = (
        compute_colorfulness(
            image_path
        )
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

    output_file = os.path.join(
        "output",
        filename.split(".")[0]
        + ".json"
    )

    save_genome(
        genome,
        output_file
    )