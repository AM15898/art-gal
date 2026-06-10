from pydantic import BaseModel
from typing import List


class VisualDNA(BaseModel):
    brightness: float
    colorfulness: float


class ArtworkGenome(BaseModel):

    moods: List[str]
    themes: List[str]
    subjects: List[str]
    techniques: List[str]
    symbolism: List[str]

    analysis: str

    visual_dna: VisualDNA