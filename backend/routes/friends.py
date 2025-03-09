from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
# from backend.schemas import UserFriendCreate, UserFriendResponse
# from backend.auth import get_current_user
# import backend.db_models
# from backend.database import get_db

from schemas import UserFriendCreate, UserFriendResponse
from auth import get_current_user
import db_models
from database import get_db



router=APIRouter()

@router.post("/friends/", response_model=UserFriendResponse)
async def add_friend(friend:UserFriendCreate,db:Session=Depends(get_db),user_id:int=Depends(get_current_user)):
    # #check if the friend already exists
    # existing_friend=db.query(backend.db_models.UserFriend).filter(backend.db_models
    #                                                       .UserFriend.user_id==user_id,backend.db_models.UserFriend.friend_name==friend.friend_name).first()
    
        #check if the friend already exists
    existing_friend=db.query(db_models.UserFriend).filter(db_models
                                                          .UserFriend.user_id==user_id,db_models.UserFriend.friend_name==friend.friend_name).first()

    if existing_friend:
        raise HTTPException(status_code=400,detail="Friend already exists")
    
    # new_friend=backend.db_models.UserFriend(
    #     user_id=user_id,
    #     username=db.query(backend.db_models.User).filter(backend.db_models.User.user_id==user_id).first().username,
    #     friend_name=friend.friend_name,
    #     friend_telegram_username=friend.friend_telegram_username,
    #     gender=friend.gender,
    #     initial_note=friend.initial_note,
    #     messages=friend.messages if friend.messages else [],
    #     profile_photo=friend.profile_photo
    # )
    new_friend=db_models.UserFriend(
        user_id=user_id,
        username=db.query(db_models.User).filter(db_models.User.user_id==user_id).first().username,
        friend_name=friend.friend_name,
        friend_telegram_username=friend.friend_telegram_username,
        gender=friend.gender,
        initial_note=friend.initial_note,
        messages=friend.messages if friend.messages else [],
        profile_photo=friend.profile_photo
    )

    db.add(new_friend)
    db.commit()
    db.refresh(new_friend)
    
    return new_friend
        



@router.delete("/friends/{friend_id}")
async def delete_friend(friend_id:int, db:Session=Depends(get_db),user_id:int=Depends(get_current_user)):
    
    #check if friend exists for the user
    # friend=db.query(backend.db_models.UserFriend).filter(backend.db_models.UserFriend.id==friend_id, backend.db_models.UserFriend.user_id==user_id).first()
    friend=db.query(db_models.UserFriend).filter(db_models.UserFriend.id==friend_id, db_models.UserFriend.user_id==user_id).first()

    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found!")
    
    db.delete(friend)
    db.commit()
    
    return{"detail":"friend deleted sucessfully"}












