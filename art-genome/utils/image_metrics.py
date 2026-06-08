import cv2
import numpy as np


def compute_brightness(image_path):
    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    return float(np.mean(gray))


def compute_colorfulness(image_path):
    image = cv2.imread(image_path)

    (b, g, r) = cv2.split(image)

    rg = np.abs(r.astype("float") - g.astype("float"))
    yb = np.abs(
        0.5 * (r.astype("float") + g.astype("float"))
        - b.astype("float")
    )

    std_rg = np.std(rg)
    std_yb = np.std(yb)

    mean_rg = np.mean(rg)
    mean_yb = np.mean(yb)

    return float(
        np.sqrt(std_rg**2 + std_yb**2)
        + 0.3 * np.sqrt(mean_rg**2 + mean_yb**2)
    )