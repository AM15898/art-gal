from PIL import Image
from sklearn.cluster import KMeans
import numpy as np


def rgb_to_hex(rgb):
    return "#{:02X}{:02X}{:02X}".format(
        int(rgb[0]),
        int(rgb[1]),
        int(rgb[2])
    )


def calculate_brightness(pixels):
    grayscale = (
        0.299 * pixels[:, 0]
        + 0.587 * pixels[:, 1]
        + 0.114 * pixels[:, 2]
    )

    return round(float(np.mean(grayscale) / 255.0), 2)


def calculate_contrast(pixels):
    grayscale = (
        0.299 * pixels[:, 0]
        + 0.587 * pixels[:, 1]
        + 0.114 * pixels[:, 2]
    )

    return round(float(np.std(grayscale) / 128.0), 2)


def calculate_warmth(pixels):
    red = np.mean(pixels[:, 0])
    blue = np.mean(pixels[:, 2])

    warmth = (red - blue + 255) / 510

    return round(float(warmth), 2)


def generate_genome(image_path):
    img = Image.open(image_path).convert("RGB")

    img.thumbnail((300, 300))

    pixels = np.array(img).reshape(-1, 3)

    kmeans = KMeans(
        n_clusters=5,
        random_state=42,
        n_init=10
    )

    kmeans.fit(pixels)

    colors = kmeans.cluster_centers_

    palette = [
        rgb_to_hex(color)
        for color in colors
    ]

    return {
        "palette": palette,
        "brightness": calculate_brightness(pixels),
        "contrast": calculate_contrast(pixels),
        "warmth": calculate_warmth(pixels)
    }