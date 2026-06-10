from builders.genome_builder import (
    build_genome
)

from services.vision_analyzer import (
    analyze_artwork
)

from prompts.artwork_prompts import (
    build_artwork_prompt
)

from utils.image_metrics import (
    compute_brightness,
    compute_colorfulness
)

from utils.exporter import (
    save_genome
)


IMAGE_PATH = (
    "input/thewave-hokusai.jpeg"
)

TITLE = (
    "The Great Wave off Kanagawa"
)

brightness = compute_brightness(
    IMAGE_PATH
)

colorfulness = compute_colorfulness(
    IMAGE_PATH
)

prompt = build_artwork_prompt(
    TITLE
)

analysis = analyze_artwork(
    IMAGE_PATH,
    prompt
)

genome = build_genome(
    TITLE,
    analysis,
    brightness,
    colorfulness
)

save_genome(
    genome,
    "output/thewave-hokusai.json"
)

print(
    "Genome generated successfully."
)