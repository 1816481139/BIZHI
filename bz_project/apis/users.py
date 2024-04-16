from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

from models import *

user_api = APIRouter()

class UsersIn(BaseModel):
    username: str
    password: str
    uploads: int = None
    marks: List[int] = None
    downloads: List[int] = None




@user_api.get("/", description="查询所有用户")
async def get_all_users():
    users = await User.all()
    return {"result": "查询所有用户", "data": users}

@user_api.post("/", description="添加用户")
async def post_users(user_in: UsersIn):

    # 首先检查是否存在具有给定username的用户
    user = await User.get_or_none(username=user_in.username)

    # 如果用户不存在，创建新用户
    if user is None:
        user = await User.create(username=user_in.username, password=user_in.password)
        return {"result": "添加用户成功", "data": user}

    # 如果用户存在，检查密码是否匹配
    if user.password == user_in.password:
        # 密码匹配，返回用户信息和登录成功消息
        return {"result": "登录成功", "data": {"id": user.id, "username": user.username}}
    else:
        # 密码不匹配，返回错误消息
        raise HTTPException(status_code=400, detail="密码输入错误")



from fastapi import HTTPException

# ... 其他代码 ...

@user_api.put("/{user_id}", description="更新用户")
async def update_user(user_id: int, user_in: UsersIn):
    # 首先尝试获取现有用户
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="用户未找到")

    # 更新用户信息
    user.username = user_in.username
    user.password = user_in.password
    await user.save()

    return {"result": "更新用户成功", "data": user}

@user_api.delete("/{user_id}", description="删除用户")
async def delete_user(user_id: int):
    # 首先尝试获取现有用户
    user = await User.get_or_none(id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="用户未找到")

    # 删除用户
    await user.delete()

    return {"result": "删除用户成功"}