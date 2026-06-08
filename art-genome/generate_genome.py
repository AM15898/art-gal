from schemas.genome import ArtworkGenome


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
        "brightness": 52.3,
        "colorfulness": 71.2
    }
)

print(genome.model_dump_json(indent=2))