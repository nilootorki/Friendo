from fastapi import FastAPI , Depends, UploadFile, File, HTTPException
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
import pandas as pd
import json
from fastapi.responses import JSONResponse, FileResponse
from fastapi.responses import RedirectResponse
import shutil

import json
import pandas as pd
# import torch
from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import numpy as np
# Load model directly
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
from datetime import datetime, date
from fastapi.staticfiles import StaticFiles

from backend.database import engine, session , base, get_db
import backend.db_models
import backend.utils
import backend.schemas
from backend.schemas import SignupResponse , ProfileCreate , UserCreate , UserFriend, UserFriendSchema
from backend.db_models import User
from backend.utils import hash_password

from typing import List
from sqlalchemy.exc import NoResultFound
import regex as re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

#import routes
from backend.routes.friends import router as friend_router
from backend.routes.login import router as login_router

app = FastAPI()

# Allow requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify specific origins instead of "*" for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

#include routers
app.include_router(login_router, prefix="/auth")
app.include_router(friend_router,prefix="/friends")


@app.get("/")
def home():
    return{"message": "Backend is running"}



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

sentiment_mapping = {
        'very negative': -1,
        'negative': -0.5,
        'neutral': 0,
        'no sentiment expressed' : 0,
        'mixed' : 0,
        'positive': 0.5,
        'very positive': 1
    }


app=FastAPI() #assign the dastapi to main app/web


@app.get("/")  #decorator that tells fastapi that get_url get requests to the root URL /
def get_url():
    return{"massage":"Welcome to Friendo!"}
   
    
app.include_router(friend_router)

base.metadata.create_all(bind=engine)  #ensure tables exist in the db


# #to avoid memory leaking



@app.post("/profileSetup/", response_model=SignupResponse)
async def ProfileSetUp(profile: ProfileCreate,  db: Session = Depends(get_db)):
    print("profile")
    print(profile.username, profile.email, profile.password, profile.personality, profile.mbti)
    print("WE ARE IN setup") 

    db_record = db.query(backend.db_models.User).filter_by(username=profile.username, password_hash = profile.password, email = profile.email).one()

        # Update existing record
    db_record.personality_type = profile.personality
    db_record.mbti = profile.mbti

    # Create new user

    db.commit()

    return {"success": True, "message": "Your personality has been set up successfully :)"}



@app.post("/signup/", response_model=SignupResponse)
async def SignUp(user: UserCreate, db: Session = Depends(get_db)):
    print(user.username, user.email, user.password)
    print("WE ARE IN")
    
    # Check if username exists
    if db.query(backend.db_models.User).filter(backend.db_models.User.username == user.username).first():
        print("YEah")
        print("Username already exists")
        return {"success": False, "message": "Username already exists"}
    
    print("NO")
    # Validate password and email
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    pass_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d._]{6,}$'

    if not re.match(pass_regex, user.password):
        return {"success": False, "message": "Invalid Password!\nValid password Contains:\n- At least 6 charachters\n- At least 1 upper case and 1 lower case alphabet\n- At least 1 number"}

    if not re.match(email_regex, user.email):
        return {"success": False, "message": "Invalid Email!"}

    hashed_password= hash_password(user.password)
    
    # Create new user
    db_record = backend.db_models.User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password  # You should hash this before storing
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)  # Ensures we get the generated user_id

    return {"success": True, "message": "User has been registered successfully!"}
    

    
@app.post("/upload_contacts/")
async def upload_contacts(user_friends : UserFriend, db:Session=Depends(get_db)):  
    print(user_friends.contacts)
    
    # save to database
    db_record = db.query(backend.db_models.User).filter_by(username=user_friends.username, password_hash = user_friends.password, email = user_friends.email).one()
    db_record.contacts = user_friends.contacts

    user_id = db_record.user_id

    for friend in user_friends.contacts:
        print(friend)
        name = friend["name"]
        gender = friend["gender"]
        db_record = backend.db_models.UserSuggestion(
            user_id=user_id,
            username=user_friends.username,
            friend_name=name,
            suggestion="Nothing",
            gender= gender,
            comment=""
        )
        db.add(db_record)

    db.commit()
    


    return{"Friends are added!"}


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/upload-json/")
async def upload_json(file: UploadFile = File(...)):
#     # Ensure the file is a JSON file
    if not file.filename.endswith(".json"):
        return {"error": "Only JSON files are allowed"}

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    # Save the uploaded JSON file
    with open(file_path, "wb") as f:
        f.write(await file.read())
        print("ADDed SUCCESSFULLY")

    print(file_path)

#     # Redirect to the Analysis Page
    return RedirectResponse(url=f"/analyze-json/?filename={file.filename}", status_code=303)





@app.get("/analyze-json/")
def analyze_json(filename: str, db: Session=Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Read JSON File
    with open(file_path, "r", encoding="utf-8") as f:
        json_content = json.load(f)

    friend_name = json_content["name"]

    # Perform Analysis
    analysis_result = analyze_data(json_content)

#     # Store Analysis in Database
    db_record = backend.db_models.UserFriend(
        user_id = 1,
        friend_id = 2,
        interaction_type = "SMS",
        # message_count = Column(Integer, default=0) ,
        # call_duration = Column(Integer, default=0) , 
        timestamp = "2025-02-26",
        messages = json_content,
        score=analysis_result
    )
    
    db.add(db_record)
    db.commit()
    # Store Analysis in Database
    db_record = backend.db_models.UserFriend(
        user_id = 1,
        username = "Nel",
        friend_name = friend_name,
        interaction_type = "SMS",
        #message_count = Column(Integer, default=0) 
        #call_duration = Column(Integer, default=0)  
        timestamp = "2025-02-26",
        messages = json_content,
        score=analysis_result
    )
    db.add(db_record)
    db.commit()

    return RedirectResponse(url=f"/suggest/?user_id=1&friend_name={friend_name}", status_code=303)



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
    dates = df["date"].unique().tolist()

    analysis_result = {
        "total_score" : [total_sentiment_score], 
        "total_no_of_messages" : [total_no_of_messages_analyzed],
        "your_sentiment_score" : [your_sentiment_score],
        "total_no_of_your_messages" : [total_no_of_your_messages],
        "friend_sentiment_score" : [friend_sentiment_score],
        "total_no_of_friend_messages" : [friend_total_no_of_messages],
        "latest_chat" : [dates[-1]],
        "dates" : [dates]      
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
    

@app.get("/suggest/", response_model=List[UserFriendSchema])
def suggestion(user_id: int, friend_name: str, db: Session=Depends(get_db)):
    record = db.query(backend.db_models.UserFriend).filter(backend.db_models.UserFriend.user_id == user_id).all()

    # Handle if no record is found
    parsed_records = []
    for r in record:
        # Convert the ORM object to a dictionary
        record_dict = r.__dict__.copy()
        
        # Parse 'messages' and 'score' fields if they are JSON strings
        if isinstance(record_dict['messages'], str):
            try:
                record_dict['messages'] = json.loads(record_dict['messages'])
            except json.JSONDecodeError as e:
                print("Failed to parse 'messages':", e)
        
        if isinstance(record_dict['score'], str):
            try:
                record_dict['score'] = json.loads(record_dict['score'])
            except json.JSONDecodeError as e:
                print("Failed to parse 'score':", e)

        parsed_records.append(UserFriendSchema(**record_dict))

    print(friend_name)
    


    
    total_score = 0
    total_messages = 0
    total_score_you = 0
    total_messages_you = 0
    total_score_friend = 0
    total_messages_friend = 0 
    dates = []
    latest_chat = datetime(1999,1, 1)
    for record in parsed_records:
        print("REcord", record.friend_name)
        if record.friend_name== friend_name:
            analyse = pd.DataFrame(record.score)
            print("Latest_chat:", analyse["latest_chat"].iloc[0])

            total_score += analyse["total_score"] * analyse["total_no_of_messages"]
            total_messages += analyse["total_no_of_messages"]

            total_score_you += analyse["your_sentiment_score"] * analyse["total_no_of_your_messages"]
            total_messages_you += analyse["total_no_of_your_messages"]

            total_score_friend += analyse["friend_sentiment_score"] * analyse["total_no_of_friend_messages"]
            total_messages_friend += analyse["total_no_of_friend_messages"]

            print(analyse)

            for dates_list in analyse["dates"]:
                for date in dates_list:
                    if date not in dates:
                        dates.append(date)

            if datetime.strptime(analyse["latest_chat"].iloc[0], "%Y-%m-%d")> latest_chat:
                latest_chat = datetime.strptime(analyse["latest_chat"].iloc[0], "%Y-%m-%d")
                

            
    total_score /= total_messages
    total_score_you /= total_messages_you
    total_score_friend /= total_messages_friend

    print("Dates", dates)

    dates_df = pd.to_datetime(dates)
    dates_diff = dates_df.diff().mean().days

    print(total_score.iloc[0], total_score_you.iloc[0], total_score_friend.iloc[0])

    if total_score_you.iloc[0] <= -0.5:
        suggestion = f"It seems that {friend_name} brings you down. I suggest not communicating with {friend_name}."

    elif (pd.Timestamp.today() - latest_chat).days > dates_diff:
       suggestion = f"You should text {friend_name}, it's been a long time."

    elif total_score_friend.iloc[0] < 0:
        suggestion = f"It's better to pay more attention to {friend_name}. She seems sad lately."
    
    else:
        suggestion = f"Everything seems good with {friend_name}! Keep going..."

    sentiment_mapping = {
        'very negative': -1,
        'negative': -0.5,
        'neutral': 0,
        'no sentiment expressed' : 0,
        'mixed' : 0,
        'positive': 0.5,
        'very positive': 1
    }

    comment = "She is my good roommate :)"
    comment_analyse = sentiment_mapping[run_model([comment])]

    total_analyse_score = (comment_analyse + float(total_score.iloc[0])) / 2

    if suggestion == f"It seems that {friend_name} brings you down. I suggest not communicating with {friend_name}." and total_analyse_score > 0:
        suggestion = f"I know your recent chat has you feeling down, but {friend_name} seems like a good friend. Maybe talking about what's been going on could help!"

    
    
    try:
        # Check if the record exists
        db_record = db.query(backend.db_models.UserSuggestion).filter_by(user_id=user_id, friend_name=friend_name).one()

        # Update existing record
        db_record.suggestion = suggestion
        db_record.comment = comment
        db_record.total_score = total_analyse_score
        db_record.timestamp = latest_chat  

    except NoResultFound:
        # Create a new record if none exists
        db_record = backend.db_models.UserSuggestion(
            user_id=user_id,
            username="Nel",
            friend_name=friend_name,
            suggestion=suggestion,
            gender="Female",
            comment=comment,
            timestamp=latest_chat,
            total_score=total_analyse_score
        )
        db.add(db_record)
    
    db.commit()

    return []


#profile images
profile_DIR="profile/"
os.makedirs(profile_DIR,exist_ok=True) # to ensure that directory exists

#to avoid memory leaking
def get_db():
    db=Session()   #start a db session
    try:
        yield db    #provides the session to FastAPI routes 
    finally:
        db.close()   #close the session after the request is complete
        
@app.post("/upload_profile_photo/{user_id}")
async def upload_profile_photo(user_id:int,file:UploadFile=File(...),db:Session=Depends(get_db)):
        allowed_files={"png","jpg","jpeg","gif"}
        file_type=file.filename.split(".")[-1].lower()
        if file_type not in allowed_files:
            raise HTTPException(status_code=400,detail="Invalid file format! only png, jpg, jpeg, gif files are accepted")
        
        profile_path=f"{profile_DIR}{user_id}.{file_type}"
        #open file in write-binary mode and copy into buffer
        with open(profile_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
            
        
        #update user's profile path in db
        user=db.query(User).filter(User.id==user_id).first()
        if not user:
            raise HTTPException(status_code=404,detail="user not found!")
        
        user.profile_photo=profile_path
        db.commit()
        
#view profile photos from db
app.mount("/profile", StaticFiles(directory="profile"),name="profile")    #tells fastAPI to serve all files inside the profile directory - available at http://localhost:8000/uploads/file name

        
#creat API endpoint to get user profile photos
@app.get("/profile_photo/{user_id}") 
async def get_profile(user_id: int , db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==user_id).first
    if not user or not user.profile_photo:
        raise HTTPException(status_code=404, detail="Profile photo not found")
    
    return {"image_url": f"/uploads/{user_id}.jpg"}

        

        



    