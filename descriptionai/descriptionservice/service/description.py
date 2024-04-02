from openai import OpenAI
import os
def generateDescriptionUsingOA(url):
    client = OpenAI(api_key=os.getenv('OPENAI_KEY'))

    response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
        "role": "user",
        "content": [
                {"type": "text", "text": "Generate 5 to 6 tags that describe this image?"},
                {
                "type": "image_url",
                "image_url": {
                        "url": url,
                        "detail": "high"
                    },
                },
            ],
        }
        ],
        max_tokens=300,
    )

    return response.choices[0].message.content