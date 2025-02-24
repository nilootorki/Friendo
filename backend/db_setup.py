import psycopg2

host='ep-odd-butterfly-a1k9unib-pooler.ap-southeast-1.aws.neon.tech'
database="neondb"
user= 'neondb_owner'
password = 'npg_HDO2KL6TFcZQ'


CREATE_TABLES_SQL="""
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    personality_type VARCHAR(50) CHECK (personality_type IN ('Introvert','Extrovert','Ambivert')) DEFAULT NULL,
    mbti VARCHAR(4) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacts JSONB DEFAULT NULL,
);

CREATE TABLE user_friends (
    id SERIAL PRIMARY KEY,  
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,  
    friend_id INT REFERENCES users(user_id) ON DELETE CASCADE,  
    interaction_type VARCHAR(10) CHECK (interaction_type IN ('Call', 'SMS')),  
    message_count INT DEFAULT 0,  
    call_duration INT DEFAULT 0,  
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    messages JSONB DEFAULT NULL
    score JSONB DEFAULT NULL  
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