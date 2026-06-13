from builders.genome_builder import build_genome
from services.vision_analyzer import analyze_artwork
from prompts.artwork_prompts import build_artwork_prompt
from utils.image_metrics import (
    compute_brightness,
    compute_colorfulness,
)

def enrich_artwork(
    title: str,
    image_path: str,
):
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

    return genome