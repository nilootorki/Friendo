from fastapi import FastAPI , Depends
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from database import engine, Session , base
import db_models

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
        