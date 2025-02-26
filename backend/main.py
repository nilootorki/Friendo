from fastapi import FastAPI , Depends, UploadFile, File, HTTPException
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from database import engine, session , base, get_db
import db_models
import pandas as pd
import json
import schemas
from fastapi.responses import JSONResponse, FileResponse
from fastapi.responses import RedirectResponse


import json
import pandas as pd
import torch
from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import numpy as np
# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
from datetime import datetime, date
from fastapi.staticfiles import StaticFiles



tokenizer = AutoTokenizer.from_pretrained("persiannlp/mt5-large-parsinlu-sentiment-analysis")
model = AutoModelForSeq2SeqLM.from_pretrained("persiannlp/mt5-large-parsinlu-sentiment-analysis")
from transformers import AutoModelForSequenceClassification, AutoConfig





def run_model(messages, **generator_args):
    # Join messages safely
    context = " <sep> ".join(messages)

    # Tokenize and generate output
    input_ids = tokenizer.encode(context, return_tensors="pt")
    res = model.generate(input_ids)
    output = tokenizer.batch_decode(res, skip_special_tokens=True)
    print(output)

    return output[0]

load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")
#JWT_sectret_key=

#check
print("DATABASE_URL",DATABASE_URL)


app=FastAPI() #assign the dastapi to main app/web


@app.get("/")  #decorator that tells fastapi that get_url get requests to the root URL /
def get_url():
    return{"massage":"Welcome to Friendo!"}
    

base.metadata.create_all(bind=engine)  #ensure tables exist in the db


# #to avoid memory leaking
# def get_db():
#     db=Session()   #start a db session
#     try:
#         yield db    #provides the session to FastAPI routes 
#     finally:
#         db.close()   #close the session after the request is complete
        
        
@app.post("/upload_contacts/{1}")
async def upload_contacts(user_id: int, file: UploadFile=File(...), db:Session=Depends(get_db)):
    content=await file.read()
    
    if file.filename.endswith(".json"):
        try:
            contacts=json.load(content)  #convert json file content into a python dic.
        except json.JSONDecodeError:
            raise HTTPException(status_code=400,detail="Invalid JSON format!")
        
    elif file.filename.endswith(".csv"):
        try:
            df=pd.read_csv(file.file)
            contacts=df.to_dict(orient="records")
        except Exception:
            raise HTTPException(status_code=400,detail=f"Error proccessing CSV:{str(Exception)}")
        
    else:
        raise HTTPException(status_code=400,detail="only JSON or CSV file formats are allowed")
    
    #df validation:
    
    try:
        contacts_validation=[schemas.FriendsBase(**contact).dict() for contact in contacts]
    except Exception:
        raise HTTPException(status_code=400, detail=f"Invalid contact list format:{str(Exception)}")
    
    
    #save to database
    user=db.query(db_models.User).filter(db_models.User.user_id==user_id).first()

    return{"massage":"Welcome to Friendo!"}


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/upload-json/")
async def upload_json(file: UploadFile = File(...)):
    # Ensure the file is a JSON file
    if not file.filename.endswith(".json"):
        return {"error": "Only JSON files are allowed"}

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save the uploaded JSON file
    with open(file_path, "wb") as f:
        f.write(await file.read())
        print("ADDed SUCCESSFULLY")

    print(file_path)

    # Redirect to the Analysis Page
    return RedirectResponse(url=f"/analyze-json/?filename={file.filename}", status_code=303)





@app.get("/analyze-json/")
def analyze_json(filename: str, db: Session=Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Read JSON File
    with open(file_path, "r", encoding="utf-8") as f:
        json_content = json.load(f)

    # Perform Analysis
    analysis_result = analyze_data(json_content)

    # Store Analysis in Database
    db_record = db_models.UserFriend(
        user_id = 1,
        friend_id = 2,
        interaction_type = "SMS",
        #message_count = Column(Integer, default=0) 
        #call_duration = Column(Integer, default=0)  
        timestamp = "2025-02-26",
        messages = json_content,
        score=analysis_result
    )
    db.add(db_record)
    db.commit()

    return {"filename": filename, "analysis": analysis_result}


def analyze_data(json_data):

    # Extract messages
    messages = json_data["messages"]
    friend_name = json_data["name"]

    # Convert to DataFrame
    df = pd.DataFrame([
        {
            "date": msg["date"][:10],  # Keep only YYYY-MM-DD
            "from": msg.get("from", "Unknown"),  # Use 'Unknown' if sender info is missing
            "text": msg["text"] if isinstance(msg["text"], str) else "",  # Keep only text messages
            "friend_name" : friend_name
        }
        for msg in messages if "date" in msg and "text" in msg
    ])

    sentiment_mapping = {
        'very negative': -1,
        'negative': -0.5,
        'neutral': 0,
        'no sentiment expressed' : 0,
        'mixed' : 0,
        'positive': 0.5,
        'very positive': 1
    }


    sentiment_result = df.groupby("date").agg(
        messages = ("text", list),
        no_of_messages = ("text", "count")
    ).reset_index()

    sentiment_result["sentiment_result"] = sentiment_result["messages"].apply(run_model)


    sentiment_result["sentiment_score"] = sentiment_result["sentiment_result"].map(sentiment_mapping)

    sentiment_result["sentiment_score"] = sentiment_result["sentiment_score"] * sentiment_result["no_of_messages"]

    print(sentiment_result)

    total_sentiment_score = sentiment_result["sentiment_score"].sum()/ sentiment_result["no_of_messages"].sum()
    total_no_of_messages_analyzed = sentiment_result["no_of_messages"].sum()

    # sentiment_results
    print(total_sentiment_score)


    # Filter messages from Niloofar Torki
    df_filtered = df[df["from"] == "Niloofar Torki"]

    your_sentiment_result = df_filtered.groupby("date").agg(
        messages = ("text", list),
        no_of_messages = ("text", "count")
    ).reset_index()

    # Group by 'date' and apply sentiment analysis (run_model)
    your_sentiment_result["sentiment_result"] = your_sentiment_result["messages"].apply(run_model)


    your_sentiment_result["sentiment_score"] = your_sentiment_result["sentiment_result"].map(sentiment_mapping)
    your_sentiment_result["sentiment_score"] = your_sentiment_result["sentiment_score"] * your_sentiment_result["no_of_messages"]
    total_no_of_your_messages = your_sentiment_result["no_of_messages"].sum()
    your_sentiment_score = your_sentiment_result["sentiment_score"].sum()/total_no_of_your_messages
    print(your_sentiment_result)
    print(your_sentiment_score, total_no_of_your_messages)
    # print(your_sentiment_score)

    # Filter messages from Niloofar Torki
    df_filtered = df[df['from'].str.contains(friend_name, na=False)]

    friend_sentiment_result = df_filtered.groupby("date").agg(
        messages = ("text", list),
        no_of_messages = ("text", "count")
    ).reset_index()

    # Group by 'date' and apply sentiment analysis (run_model)
    friend_sentiment_result["sentiment_result"] =friend_sentiment_result["messages"].apply(run_model)

    friend_sentiment_result["sentiment_score"] = friend_sentiment_result["sentiment_result"].map(sentiment_mapping)
    friend_sentiment_result["sentiment_score"] = friend_sentiment_result["sentiment_score"] * friend_sentiment_result["no_of_messages"]
    friend_total_no_of_messages = friend_sentiment_result["no_of_messages"].sum()
    friend_sentiment_score = friend_sentiment_result["sentiment_score"].sum()/friend_total_no_of_messages

    analysis_result = {
        "total_score" : [total_sentiment_score], 
        "total_no_of_messages" : [total_no_of_messages_analyzed],
        "your_sentiment_score" : [your_sentiment_score],
        "total_no_of_your_messages" : [total_no_of_your_messages],
        "friend_sentiment_score" : [friend_sentiment_score],
        "total_no_of_friend_messages" : [friend_total_no_of_messages],
    }
    analysis_df = pd.DataFrame(analysis_result)

    json_analysis_result = analysis_df.to_json(orient="records")

    print(friend_sentiment_result)
    print(friend_sentiment_score, friend_total_no_of_messages)
    print(json_analysis_result)


    if isinstance(json_data, dict):
        return json_analysis_result
    elif isinstance(json_data, list):
        num_items = len(json_data)
        return {"type": "Array", "num_items": num_items}
    else:
        return {"error": "Unsupported JSON format"}