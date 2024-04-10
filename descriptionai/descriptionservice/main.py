import os
from fastapi import FastAPI, UploadFile
from typing import List

import google.generativeai as genai
from PIL import Image
from io import BytesIO
from service.description import generateDescriptionUsingOA

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
    response = model.generate_content(["Generate a description of the donation from this image. This description will be used as one of the properties stored in the database for a Donations management system product. Be precise and make an educated guess about the colors, size and type of items in the image. You do not have to fully describe this image but only give information about the items that are present there that can be put up for donation", img])
    return { 
        "description": response.text
    }
