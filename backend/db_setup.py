import psycopg2

host='ep-odd-butterfly-a1k9unib-pooler.ap-southeast-1.aws.neon.tech'
database="neondb"
user= 'neondb_owner'
password = 'npg_HDO2KL6TFcZQ'


CREATE_TABLES_SQL="""
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    personality_type VARCHAR(50) CHECK (personality_type IN ('Introvert','Extrovert','Ambivert')) DEFAULT NULL,
    mbti VARCHAR(4) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacts JSONB DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_friends ( 
    id SERIAL PRIMARY KEY,  
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,  
    username VARCHAR(50) NOT NULL,
    friend_name VARCHAR(50) NOT NULL,  
    interaction_type VARCHAR(10) CHECK (interaction_type IN ('Call', 'SMS')),  
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    messages JSONB DEFAULT NULL,
    score JSONB DEFAULT NULL  
);


CREATE TABLE IF NOT EXISTS user_suggestions (
    id SERIAL PRIMARY KEY,  
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,  
    username VARCHAR(50) NOT NULL,
    friend_name VARCHAR(50) NOT NULL,  
    suggestion VARCHAR(500) NOT NULL,   
    gender VARCHAR(50) DEFAULT NULL,
    comment VARCHAR(500) DEFAULT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_score FLOAT DEFAULT NULL 
);


"""



def connectxcreate():
    try:
        print("Attempting to connect to the database...")
        connection=psycopg2.connect(
            host=host,
            database=database,
            user=user,
            password=password,
            sslmode='require'
        )
        print("connected to database")
        
        cursor=connection.cursor()
        cursor.execute(CREATE_TABLES_SQL)
        connection.commit()
        print("tables creaated successfully")
        cursor.close()
        
        connection.close()
        print("connection closed successfully")
    except Exception as error:
        print("error connecting to database", error)
        
        





# CREATE TABLE interactions (
#     interaction_id SERIAL PRIMARY KEY,
#     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
#     friend_id INT REFERENCES users(user_id) ON DELETE CASCADE,
#     mood_score INT CHECK (mood_score BETWEEN 1 AND 10),  
#     mood_notes TEXT,
#     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
# );

# CREATE TABLE mood (
#     mood_id SERIAL PRIMARY KEY,
#     user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
#     friend_id INT REFERENCES users(user_id) ON DELETE CASCADE,
#     suggestion_text TEXT,  
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
# );