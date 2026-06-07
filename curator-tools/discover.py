import sys
from providers.met import search_artworks

def main():
    query = sys.argv[1]

    ids = search_artworks(query)

    print(f"Found {len(ids)} artworks")
    print(ids[:10])

if __name__ == "__main__":
    main()