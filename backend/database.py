from sqlalchemy import create_engine #create_engine establishes the db connection

from sqlalchemy.orm import sessionmaker, declarative_base


db_URL="postgresql://neondb_owner:npg_HDO2KL6TFcZQ@ep-odd-butterfly-a1k9unib-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

engine=create_engine(db_URL)  #allows FastAPI to execuute SQL queries

#create a session to make changes(insert,update,delete) before saving them in db
#changes arent automatically saved, need to commit manually
session=sessionmaker(autocommit=False, autoflush=False, bind=engine)

base=declarative_base()  #to define db tables as python

