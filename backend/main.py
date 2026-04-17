from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Message(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Backend working"}

@app.post("/chat")
def chat(data: Message):
    return {"response": f"Lab Assistant: {data.message}"}