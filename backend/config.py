#store secret keys and JWT settings

import os
from dotenv import load_dotenv   #to load sensitive config data from .env file


load_dotenv()

secret_key=os.getenv("JWT_secret_key")
algorithm="HS256"   #is for both signing and verifying the token
access_token_expire_min=60


