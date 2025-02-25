#data validation to ensure that data we store, follows a proper format
from pydantic import BaseModel ,   #pydantiic is a data validation and serialization library that FastAPII uses to ensure data is valid and structured properly
from typing import Optional

#define Pydantic models

class FriendsBase(BaseModel):   #defines the fields that should exist in every contact objects
    name:str
    phone_number:Optional[str]   #not sure to add these
    emaiL:Optional[str]
    
    
    
class FriendsResponse(FriendsBase):
    class config:
        orm_mode=True
        
        
