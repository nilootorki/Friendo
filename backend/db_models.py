from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, CheckConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSON
from database import base

class User(base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    personality_type = Column(String(50), nullable=True)
    mbti = Column(String(4), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    contacts = Column(JSON, nullable=True, default=[])
    
class UserFriend(base):
    __tablename__ = "user_friends"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    friend_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    interaction_type = Column(String(10), CheckConstraint("interaction_type IN ('Call', 'SMS')"))
    #message_count = Column(Integer, default=0) 
    #call_duration = Column(Integer, default=0)  
    timestamp = Column(DateTime, server_default=func.now())
    messages = Column(JSON, nullable=True)
    score=Column(JSON, nullable=True)
    
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