import json
import os
import sys

from providers.met import (
    search_artworks,
    get_artwork_details,
    download_image,
)

MAX_ARTWORKS = 10


def main():
    query = sys.argv[1]

    print(f"Searching for: {query}")

    ids = search_artworks(query)

    if not ids:
        print("No artworks found")
        return

    output_dir = f"temp/discover/{query}"
    images_dir = f"{output_dir}/images"

    os.makedirs(images_dir, exist_ok=True)

    catalog = []

    count = 0

    for object_id in ids:

        if count >= MAX_ARTWORKS:
            break

        details = get_artwork_details(object_id)

        image_url = details.get("primaryImage")

        if not image_url:
            continue

        image_filename = f"{count + 1}.jpg"
        image_path = os.path.join(
            images_dir,
            image_filename
        )

        print(
            f"Downloading {count+1}: "
            f"{details.get('title')}"
        )

        download_image(
            image_url,
            image_path
        )

        catalog.append({
            "objectID": object_id,
            "title": details.get("title"),
            "artist": details.get(
                "artistDisplayName"
            ),
            "date": details.get(
                "objectDate"
            ),
            "image": f"images/{image_filename}"
        })

        count += 1

    metadata_path = (
        f"{output_dir}/metadata.json"
    )

    with open(
        metadata_path,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            catalog,
            f,
            indent=2,
            ensure_ascii=False
        )

    print()
    print(f"Downloaded {count} artworks")
    print(f"Metadata saved to {metadata_path}")


if __name__ == "__main__":
    main()