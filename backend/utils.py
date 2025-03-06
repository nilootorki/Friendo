from passlib.context import CryptContext   #for password hashing and verification
import jwt
from datetime import datetime,timedelta
from typing import Optional
import os
# from auth import create_token , get_current_user


pwd_context=CryptContext(schemes=["bcrypt"], deprecated="auto")
 
secret_key=os.getenv("JWT_secret_key")
algorithm="HS256"   #is for both signing and verifying the token

#return hashed version of plain text password
def hash_password(password:str)-> str:
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str):
    return pwd_context.verify(plain_password,hashed_password)

