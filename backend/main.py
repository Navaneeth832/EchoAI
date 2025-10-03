
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import csv
import os
from datetime import datetime
import pyttsx3
from pydantic import BaseModel
from write import generate_journal_entry,write_to_txt
from audiomaker import generate_audio,wave_file

app = FastAPI()

# CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DIARY DIRECTORIES ---
DEAR_DIARY_DIR = "Dear_Diary"
AUDIO_DIARY_DIR = "Audio_Diary"


# --- DATA MODELS ---
class DiaryEntry(BaseModel):
    q1: str
    q2: str
    q3: str

# --- HELPER FUNCTIONS ---
@app.post("/generate_diary")
def generate_diary(q1: str, q2: str, q3: str) -> str:
    diary_contents=generate_journal_entry(q1, q2, q3)
    write_to_txt(datetime.now().strftime("%d-%m-%Y"), diary_contents)
    #generate_audio(f"{DEAR_DIARY_DIR}/{datetime.now().strftime('%d-%m-%Y')}_diary.txt")
    return "Journal entry generated and saved."


# --- API ENDPOINTS ---
@app.get("/")
async def read_root():
    return FileResponse('..\\frontend\\index.html')

@app.get("/entries")
async def get_entries():
    entries = []
    if os.path.exists(DEAR_DIARY_DIR):
        for filename in os.listdir(DEAR_DIARY_DIR):
            if filename.endswith(".txt"):
                with open(os.path.join(DEAR_DIARY_DIR, filename), 'r', encoding='utf-8') as file:
                    content = file.read()
                    entries.append({"filename": filename, "content": content})
    return JSONResponse(content=entries)


# --- STATIC FILES ---
@app.get("/{filename}")
async def read_frontend(filename: str):
    filename=f"Dear_Diary/{filename}"
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
            print(content)
        return JSONResponse(content={"filename": filename, "content": content})
    else:
        raise HTTPException(status_code=404, detail="File not found")

