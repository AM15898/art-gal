from schemas.genome import ArtworkGenome


def build_genome(
    title,
    analysis,
    brightness,
    colorfulness
):
    return ArtworkGenome(
        title=title,

        moods=analysis["moods"],
        themes=analysis["themes"],
        subjects=analysis["subjects"],
        techniques=analysis["techniques"],
        symbolism=analysis["symbolism"],
        analysis=analysis["analysis"],

        visual_dna={
            "brightness": brightness,
            "colorfulness": colorfulness
        }
    )