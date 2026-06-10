import base64
import json
import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def encode_image(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(
            f.read()
        ).decode("utf-8")
    
def analyze_artwork(
    image_path,
    prompt
):
    image_base64 = encode_image(
        image_path
    )

    response = client.chat.completions.create(
        model="gpt-4o",

        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url":
                            f"data:image/jpeg;base64,{image_base64}"
                        }
                    }
                ]
            }
        ],

        response_format={
            "type": "json_object"
        }
    )

    return json.loads(
        response.choices[0]
        .message.content
    )