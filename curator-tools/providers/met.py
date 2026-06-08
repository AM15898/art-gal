import requests

SEARCH_URL = (
    "https://collectionapi.metmuseum.org/public/collection/v1/search"
)

def search_artworks(query):
    response = requests.get(
        SEARCH_URL,
        params={
            "q": query,
            "hasImages": "true"
        }
    )

    data = response.json()

    return data.get("objectIDs", [])

OBJECT_URL = (
    "https://collectionapi.metmuseum.org/public/collection/v1/objects"
)

def get_artwork_details(object_id):
    response = requests.get(
        f"{OBJECT_URL}/{object_id}"
    )

    return response.json()

def download_image(url, filepath):
    response = requests.get(url)

    with open(filepath, "wb") as f:
        f.write(response.content)