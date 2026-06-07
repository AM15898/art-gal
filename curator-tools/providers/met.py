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