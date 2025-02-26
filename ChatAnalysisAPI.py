from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import os

from fastapi import FastAPI, UploadFile, File
import os
import json

from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.responses import RedirectResponse
import os
import json
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON


base=declarative_base() 


app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

DATABASE_URL = "postgresql://neondb_owner:npg_HDO2KL6TFcZQ@ep-odd-butterfly-a1k9unib-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# Create Engine and Session for Database Connection
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload-json/")
async def upload_json(file: UploadFile = File(...)):
    # Ensure the file is a JSON file
    if not file.filename.endswith(".json"):
        return {"error": "Only JSON files are allowed"}

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving the file: {str(e)}")

    # Redirect to the Analysis Page
    return RedirectResponse(url=f"/analyze-json/?filename={file.filename}", status_code=303)

class User(base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    personality_type = Column(String(50), nullable=True)
    mbti = Column(String(4), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    contacts = Column(JSON, nullable=True, default=[])


@app.get("/analyze-json/")
def analyze_json(filename: str, db: Session = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Read JSON File
    with open(file_path, "r", encoding="utf-8") as f:
        json_content = json.load(f)

    # Perform Analysis
    analysis_result = analyze_data(json_content)

    # Store Analysis in Database
    db_record = User(
        filename=filename,
        json_content=json.dumps(json_content),
        analysis_result=json.dumps(analysis_result),
    )
    db.add(db_record)
    db.commit()

    return {"filename": filename, "analysis": analysis_result}



def analyze_data(json_data):
    if isinstance(json_data, dict):
        num_keys = len(json_data)
        keys_list = list(json_data.keys())
        return {"type": "Object", "num_keys": num_keys, "keys": keys_list}
    elif isinstance(json_data, list):
        num_items = len(json_data)
        return {"type": "Array", "num_items": num_items}
    else:
        return {"error": "Unsupported JSON format"}



def analyze_json(json_data):
    """
    Example analysis function.
    Modify this function to perform specific analysis on the uploaded JSON.
    """
    if isinstance(json_data, dict):
        num_keys = len(json_data)  # Count number of keys in the JSON object
        keys_list = list(json_data.keys())  # List of keys
        return {
            "type": "Object",
            "num_keys": num_keys,
            "keys": keys_list
        }
    elif isinstance(json_data, list):
        num_items = len(json_data)  # Count number of items in a JSON array
        return {
            "type": "Array",
            "num_items": num_items
        }
    else:
        return {"error": "Unsupported JSON format"}

# Endpoint to analyze the chat data
@app.get("/analyze/")
async def analyze_chat(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    # Load and preprocess data
    df = pd.read_csv(file_path)
    if 'Message' not in df.columns:
        raise HTTPException(status_code=400, detail="Invalid CSV format")

    message_count = df['Message'].count()
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(' '.join(df['Message'].astype(str)))

    # Save the word cloud image
    image_path = os.path.join(UPLOAD_DIR, "wordcloud.png")
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.savefig(image_path)
    plt.close()

    return JSONResponse(content={"message_count": message_count, "wordcloud_image": "/download/wordcloud.png"})

# Endpoint to download the word cloud image
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="image/png", filename=filename)

# Run the API with: uvicorn ChatAnalysisAPI:app --reload