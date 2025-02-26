from fastapi import FastAPI , Depends, UploadFile, File, HTTPException
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from database import engine, session , base
import db_models
import pandas as pd
import json
import schemas

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


#to avoid memory leaking
def get_db():
    db=Session()   #start a db session
    try:
        yield db    #provides the session to FastAPI routes 
    finally:
        db.close()   #close the session after the request is complete
        
        
@app.post("/upload_contacts/{user_id}")
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
    if not user