from services.embedding_generator import (
    generate_embedding
)

result = generate_embedding(
    "public/artworks/thewave-hokusai.jpeg"
)

print(
    len(result["vector"])
)

print(
    result["vector"][:10]
)