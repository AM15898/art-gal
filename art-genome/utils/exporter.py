import os


def save_genome(genome, output_path):
    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    with open(output_path, "w") as f:
        f.write(
            genome.model_dump_json(
                indent=2
            )
        )