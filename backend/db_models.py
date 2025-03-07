from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, CheckConstraint, Float, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON
from backend.database import base


class User(base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username=Column(String(50), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    gender = Column(String(10), CheckConstraint("gender IN ('Male', 'Female')"), nullable=False)
    personality_type = Column(String(50), nullable=True)
    mbti = Column(String(4), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    contacts = Column(JSON, nullable=True, default=[])
    profile_photo=Column(Text, nullable=True)
    
class UserFriend(base):
    __tablename__ = "user_friends"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    username=Column(String(50), nullable=False)
    friend_name = Column(String(50), nullable=False)  #i should make nullable True 
    friend_telegram_username = Column(String(50), nullable=True)
    gender = Column(String(10), CheckConstraint("gender IN ('Male', 'Female')"), nullable=True)
    interaction_type = Column(String(10), CheckConstraint("interaction_type IN ('Call', 'SMS')"))
    timestamp = Column(DateTime, server_default=func.now())
    messages = Column(JSON, nullable=True)
    score=Column(JSON, nullable=True)
    initial_note = Column(Text, nullable=True)
    
class UserSuggestion(base):
    __tablename__="user_suggestions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    username=Column(String(50), nullable=False)
    friend_name = Column(String(50), nullable=False)
    suggestion = Column(String(500), nullable=True)
    gender = Column(String(50), nullable=True)
    interaction_type = Column(String(10), CheckConstraint("interaction_type IN ('Call', 'SMS')"))
    comment = Column(String(500), nullable=True)
    timestamp = Column(DateTime, server_default=func.now())
    messages = Column(JSON, nullable=True)
    score=Column(JSON, nullable=True)
    initial_note = Column(Text, nullable=True)
    total_score=Column(String(50), nullable=True)
    checked=Column(Boolean, default=False)
    profile_photo=Column(Text, nullable=True)
    
    
# class Interaction(base):
#     __tablename__ = "interactions"
    
#     interaction_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     friend_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     mood_score = Column(Integer, CheckConstraint("mood_score BETWEEN 1 AND 10"))
#     mood_notes = Column(Text)
#     timestamp = Column(DateTime, server_default=func.now()) 
    
# class Mood(base):
#     __tablename__ = "mood"
#     mood_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     friend_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     suggestion_text = Column(Text)
#     created_at = Column(DateTime, server_default=func.now())