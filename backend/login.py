from fastapi import FastAPI,Depends,HTTPException
from sqlalchemy.orm import Session
import re
from backend.utils import verify_password
from backend.auth import create_token
from backend.schemas import UserLoginResponse, UserLoginRequest
import backend.db_models
from backend.database import get_db
from datetime import datetime, timedelta
from backend.config import secret_key, algorithm,access_token_expire_min


app=FastAPI()

#endpoint for user login
@app.post("/login/", response_model=UserLoginResponse)
async def login(user:UserLoginRequest,db:Session=Depends(get_db)):
    
    #email validation
    # email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    # if not re.match(email_regex,user.email):
    #     raise HTTPException(status_code=400, detail="Invalid Email format")
    
    #check if user exists in db
    db_user=db.query(backend.db_models.User).filter(backend.db_models.User.username==user.username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    #password verification
    if not verify_password(user.password,db_user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    # create a JWT token upon successful login
    #store user_id in JWT
    #creat token with expiration time
    expire_time = datetime.utcnow() + timedelta(minutes=access_token_expire_min)
    
    access_token = create_token(data={"sub": db_user.user_id ,"exp": expire_time.timestamp()})
    
    return {"access_token": access_token, "token_type": "bearer", "expires_at": expire_time.isoformat()}




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


