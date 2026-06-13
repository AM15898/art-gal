from PIL import Image
from sklearn.cluster import KMeans
import numpy as np
import json
import sys

image_path = sys.argv[1]

img = Image.open(image_path).convert("RGB")

# make processing faster
img.thumbnail((300, 300))

pixels = np.array(img).reshape(-1, 3)

kmeans = KMeans(
    n_clusters=8,
    random_state=42,
    n_init=10
)

labels = kmeans.fit_predict(pixels)

colors = kmeans.cluster_centers_.astype(int)

counts = np.bincount(labels)

percentages = counts / counts.sum() * 100

palette = []

for color, percent in zip(colors, percentages):
    hex_color = "#{:02x}{:02x}{:02x}".format(
        color[0],
        color[1],
        color[2]
    )

    palette.append({
        "hex": hex_color,
        "percentage": round(float(percent), 2)
    })

palette.sort(
    key=lambda x: x["percentage"],
    reverse=True
)

print(json.dumps(palette, indent=2))