from pydantic import BaseModel
from fastapi import FastAPI
import os
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")  # Make sure it's in your .env

app = FastAPI()


class UserMessage(BaseModel):
    user_message: str


@app.post("/chat")
async def chat(message: UserMessage):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "user", "content": message.user_message}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        reply = result["choices"][0]["message"]["content"]
        return {"response": reply}
    else:
        return {"error": response.text}