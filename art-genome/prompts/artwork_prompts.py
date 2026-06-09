def build_artwork_prompt(title="Unknown Artwork"):
    return f"""
You are an art historian and visual analyst.

Artwork Title:
{title}

Analyze the artwork and return ONLY valid JSON.

Schema:

{{
  "moods": [],
  "themes": [],
  "subjects": [],
  "techniques": [],
  "symbolism": [],
  "analysis": ""
}}

Rules:

- moods: 5-10 items
- themes: 5-10 items
- subjects: 5-10 items
- techniques: 3-10 items
- symbolism: 3-10 items

- use concise phrases
- no markdown
- valid JSON only
"""