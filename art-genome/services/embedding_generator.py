from PIL import Image
import torch
import open_clip

# Load model once when module starts
model, _, preprocess = open_clip.create_model_and_transforms(
    "ViT-B-32",
    pretrained="laion2b_s34b_b79k"
)

model.eval()


def generate_embedding(image_path):
    image = preprocess(
        Image.open(image_path).convert("RGB")
    ).unsqueeze(0)

    with torch.no_grad():
        embedding = model.encode_image(image)

        embedding /= embedding.norm(
            dim=-1,
            keepdim=True
        )

    vector = embedding.squeeze().tolist()

    return {
        "model": "ViT-B-32",
        "vector": vector
    }