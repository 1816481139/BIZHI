# apis/login.py
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from models import User

class UserLogin(BaseModel):
    username: str
    password: str

login_api = APIRouter()

@login_api.post("/")
async def login(user_credentials: UserLogin):
    user = await User.get_or_none(username=user_credentials.username)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if user.password != user_credentials.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")

    return {"message": "登陆成功",
            "data": {
                "username": user.username,
                "user_id": user.id
            },
            "status": "success"}