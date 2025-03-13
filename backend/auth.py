from fastapi import APIRouter, Depends, HTTPException, Request
from datetime import datetime, timedelta
import jwt
from jose import JWTError # for creating, encoding, and decoding JWTs
from fastapi.security import OAuth2PasswordBearer  #to handle OAuth2 (used for token based authentications)
from fastapi import Depends,HTTPException, status
# from backend.config import secret_key, algorithm,access_token_expire_min
# import backend.db_models

from config import secret_key, algorithm,access_token_expire_min
import db_models

# from backend.database import get_db
from database import get_db
from sqlalchemy.orm import Session


#defines authenticccation scheme
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="token")




#create a JWT token
def create_token(data:dict):
    data_copy=data.copy()
    
    if "sub" not in data_copy:
        raise ValueError("Token data must include a 'sub' field for the user identifier")


    data_copy["sub"]=str(data_copy["sub"])

    print(f"DEBUG: Creating token with sub={data_copy['sub']} (type={type(data_copy['sub'])})")  # Debugging line

    #set expiration time
    expire=datetime.utcnow() +timedelta(minutes=access_token_expire_min)
    data_copy.update({"exp":expire})
    #encode and return the token
    return jwt.encode(data_copy,secret_key,algorithm=algorithm)

#get current user
def get_current_user(request:Request, db:Session=Depends(get_db),token:str=None):
    
    # exceptions=HTTPException(
    #     status_code=status.HTTP_401_UNAUTHORIZED,
    #     detail="Invalid authentication token",
    #     headers={"WWW-Authenticate": "Bearer"},
    # )
    
    print("token is decoding", token)
    if not token:
        token=request.cookies.get("access_token")
    
    if not token:
        auth_header= request.header.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token=auth_header[len("Bearer "):]

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    #the authentication type is bearer
    
    try:
        #decode the token
        token = token.replace("Bearer ", "").strip()
        payload=jwt.decode(token, secret_key,algorithms=[algorithm])
        user_id= payload.get("sub")    #sub(subject) represents the user identifier

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        
        user_id=int(user_id)
        user = db.query(db_models.User).filter(db_models.User.user_id == int(user_id)).first()
        print(user_id)
        if not user or user.jwt_token!=token:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Token has expired or is invalid")
    
# router=APIRouter()
# @router.post("/login", response_model=UserLoginResponse)
# async def login(user: UserLoginRequest, db: Session = Depends(get_db)):
#     # Check if the user exists in the database
#     db_user = db.query(User).filter(User.username == user.username).first()
    
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # Verify the password (you should compare the hashed password in the DB)
#     if not verify_password(user.password, db_user.password_hash):
#         raise HTTPException(status_code=400, detail="Incorrect password")
    
#     # Create JWT token
#     access_token = create_token(data={"sub": db_user.user_id})
    
#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }