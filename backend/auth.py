from datetime import datetime, timedelta
from jose import jwt, JWTError # for creaating, encoding, and decoding JWTs
from fastapi.security import OAuth2PasswordBearer  #to handle OAuth2 (used for token based authentications)
from fastapi import Depends,HTTPException, status
from backend.config import secret_key, algorithm,access_token_expire_min
import backend.db_models
from backend.database import get_db
from sqlalchemy.orm import Session


#defines authenticccation scheme
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="token")


#create a JWT token
def create_token(data:dict):
    data_copy=data.copy()
    
    if "sub" not in data_copy:
        raise ValueError("Token data must include a 'sub' field for the user identifier")

    #set expiration time
    expire=datetime.utcnow() +timedelta(minutes=access_token_expire_min)
    data_copy.update({"exp":expire})
    #encode and return the token
    return jwt.encode(data_copy,secret_key,algorithm=algorithm)

#get current user
def get_current_user(token:str=Depends(oauth2_scheme), db:Session=Depends(get_db)):
    
    exceptions=HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    #the authentication type is bearer
    
    try:
        #decode the token
        payload=jwt.decode(token, secret_key,algorithms=[algorithm])
        user_id: int=payload.get("sub")    #sub(subject) represents the user identifier
        if user_id is None:
            raise exceptions
        user = db.query(db_models.User).filter(db_models.User.user_id == int(user_id)).first()
        if not user:
            raise exceptions
        
        return user_id
    except JWTError:
        raise exceptions