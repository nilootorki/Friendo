#data validation to ensure that data we store, follows a proper format
from pydantic import BaseModel   #pydantiic is a data validation and serialization library that FastAPII uses to ensure data is valid and structured properly
from typing import Optional,List,Dict
from datetime import datetime
from typing import Any, Dict


#define Pydantic models

class FriendsBase(BaseModel):   #defines the fields that should exist in every contact objects
    name:str
    phone_number:Optional[str]=None   #not sure to add these
    emaiL:Optional[str] =None
    
    
    
class FriendsResponse(FriendsBase):
    class config:
        orm_mode=True
        

class UserFriendSchema(BaseModel):
    id: int
    user_id: int
    friend_id: int
    interaction_type: str
    timestamp: datetime
    messages: Dict[str, Any]
    score: List[Dict[str, Any]]



    class Config:
        from_attributes = True
        
