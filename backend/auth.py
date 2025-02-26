from datetime import datetime, timedelta
from jose import jwt, JWTError # for creaating, encoding, and decoding JWTs
from fastapi.security import OAuth2PasswordBearer  #to handle OAuth2 (used for token based authentications)
from fastapi import Depends,HTTPException, status
from config import secret_key, algorithm,access_token_expire_min


#defines authenticccation scheme
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="token")


#create a JWT token
def create_token(data:dict):
    data_copy=data.copy
    #set expiration time
    expire=datetime.utcnow()+timedelta(minutes=access_token_expire_min)
    data_copy.update({"exp":expire})
    #encode and return the token
    return jwt.encode(data_copy,secret_key,algorithm=algorithm)

#get current user
def get_current_user(token:str=Depends(oauth2_scheme)):
    
    exceptions=HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication token"
    )
    
    #the authentication type is bearer
    
    try:
        #decode the token
        payload=jwt.decode(token, secret_key,algorithms=[algorithm])
        user_id: int=payload.get("su")
        if user_id is None:
            raise exceptions
        return user_id
    except JWTError:
        raise exceptions