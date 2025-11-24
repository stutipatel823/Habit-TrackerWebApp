import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()  # Reads .env

url: str = os.environ["SUPABASE_URL"]
key: str = os.environ["SUPABASE_SERVICE_KEY"]

supabase: Client = create_client(url, key)
