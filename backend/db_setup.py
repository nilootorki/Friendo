import psycopg2

host='ep-odd-butterfly-a1k9unib-pooler.ap-southeast-1.aws.neon.tech'
database="neondb"
user= 'neondb_owner'
password = 'npg_HDO2KL6TFcZQ'

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
    
    connection.close()
    print("connection closed successfully")
except Exception as error:
    print("error connecting to database", error)