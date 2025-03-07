from fastapi import APIRouter , HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.schemas import UserEditRequest, UserResponse
from backend.auth import get_current_user
import backend.db_models 
from backend.utils import hash_password, verify_password
from datetime import datetime

router=APIRouter()

@router.put("/user/update", response_mode=UserResponse) 
async def edit_user(user_update:UserEditRequest, db:Session=Depends(get_db), current_user:int=Depends(get_current_user)):
    
    #check if user exists
    db_user=db.query(backend.db_models.User).filter(backend.db_models.User.user_id==current_user).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    #edit and update user
    if user_update.username:
        db_user.username=user_update.username
        
    if user_update.email:
        db_user.email=user_update.email
    
    if user_update.password:
        db_user.password_hash=hash_password(user_update.password)
        
    if user_update.mbti:
        db_user.mbti=user_update.mbti
        
    if user_update.personality_type:
        db_user.personality_type=user_update.personality_type
        
    if user_update.profile_photo:
        db_user.profile_photo=user_update.profile_photo
        
        
    #set update time to current time    
    db_user.updated_at=datetime.utcnow()
    
    db.commit()
    db.refresh(db_user)
    
    return db_user
    