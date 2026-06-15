from color_genome import generate_genome
import json

genome = generate_genome(
    "public/artworks/starrynightoverrhone-vangogh.jpg"
)

print(json.dumps(genome, indent=2))