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