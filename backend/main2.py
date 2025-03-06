from fastapi import FastAPI , Depends, UploadFile, File, HTTPException
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from database import engine, session , base, get_db
from db_models import User
import db_models
import pandas as pd
import json
import schemas
from fastapi.responses import JSONResponse, FileResponse
from fastapi.responses import RedirectResponse
import shutil

import json
import pandas as pd
# import torch
# from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import numpy as np
# Load model directly
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification
from datetime import datetime, date
from fastapi.staticfiles import StaticFiles

from schemas import UserFriendSchema, UserCreate, UserResponse, SignupResponse, ProfileCreate, UserFriend
from typing import List

from sqlalchemy.exc import NoResultFound

import regex as re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests


app=FastAPI()

@app.get("/")  #decorator that tells fastapi that get_url get requests to the root URL /
def get_url():
    return{"massage":"Welcome to Friendo!"}
    

base.metadata.create_all(bind=engine)  #ensure tables exist in the db



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
        
@app.post("/upload_profile_photo/{user_id}/{friend_name}")
async def upload_profile_photo(user_id:int,friend_name:str, file:UploadFile=File(...),db:Session=Depends(get_db)):
        allowed_files={"png","jpg","jpeg","gif"}
        file_type=file.filename.split(".")[-1].lower()
        if file_type not in allowed_files:
            raise HTTPException(status_code=400,detail="Invalid file format! only png, jpg, jpeg, gif files are accepted")
        
        profile_path=f"{profile_DIR}{user_id}_{friend_name}.{file_type}"
        #open file in write-binary mode and copy into buffer
        with open(profile_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
            
        
        #update friend's profile path in db
        friend=db.query(UserFriend).filter(UserFriend.user_id==user_id, UserFriend.friend_name==friend_name).first()
        if not friend:
            raise HTTPException(status_code=404,detail="friend not found!")
        
        friend.profile_photo=profile_path
        db.commit()
        
#view profile photos from db
app.mount("/profile", StaticFiles(directory="profile"),name="profile")    #tells fastAPI to serve all files inside the profile directory - available at http://localhost:8000/uploads/file name

        
#creat API endpoint to get user profile photos
@app.get("/profile_photo/{user_id}/{friend_name}") 
async def get_profile(user_id: int ,friend_name:str, db:Session=Depends(get_db)):
    friend=db.query(UserFriend).filter(UserFriend.user_id==user_id, UserFriend.friend_name==friend_name).first()
    if not friend or not friend.profile_photo:
        raise HTTPException(status_code=404, detail="Profile photo not found")
    
    return {"image_url": f"/uploads/{friend.profile_photo}"}




#should fix this in main.py:
   # Create new user
    # db_record = db_models.User(
    #     username=user.username,
    #     email=user.email,
    #     password_hash=hash_password(user.password)  # You should hash this before storing
    # )