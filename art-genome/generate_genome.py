from schemas.genome import ArtworkGenome

from schemas.genome import ArtworkGenome
from utils.image_metrics import (
    compute_brightness,
    compute_colorfulness,
)

from prompts.artwork_prompts import build_artwork_prompt


image_path = "input/thewave-hokusai.jpeg"


prompt = build_artwork_prompt(image_path)

print(prompt)

brightness = compute_brightness(image_path)

colorfulness = compute_colorfulness(image_path)

print("Brightness:", brightness)
print("Colorfulness:", colorfulness)

genome = ArtworkGenome(
    title="The Great Wave off Kanagawa",

    moods=[
        "dramatic",
        "powerful",
        "energetic"
    ],

    themes=[
        "nature",
        "human vulnerability"
    ],

    subjects=[
        "wave",
        "boats",
        "mount fuji"
    ],

    techniques=[
        "woodblock print"
    ],

    symbolism=[
        "power of nature"
    ],

    analysis="A dramatic depiction of the ocean.",

    visual_dna={
        "brightness": brightness,
        "colorfulness": colorfulness
    }   
)

print(genome.model_dump_json(indent=2))


with open(
    "output/thewave-hokusai.json",
    "w"
) as f:
    f.write(
        genome.model_dump_json(indent=2)
    )