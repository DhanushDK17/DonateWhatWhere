import os
from fastapi import FastAPI, UploadFile
from typing import List

import google.generativeai as genai
from PIL import Image
from io import BytesIO

from dotenv import load_dotenv

load_dotenv()

GEMINI_KEY = os.getenv('GEMINI_KEY')
genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro-vision')

app = FastAPI()

@app.get('/health')
def root():
    return "Service is up and running. OK"


@app.post("/")
async def generateDescription(file: UploadFile):
    imageFileContent = await file.read()
    img = Image.open(BytesIO(imageFileContent))
    response = model.generate_content(["Give a short description for this image", img])
    return { 
        "description": response.text
    }
