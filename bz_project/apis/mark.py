from fastapi import APIRouter, HTTPException, Depends, status
from models import Mark, User, Img
from tortoise.exceptions import DoesNotExist
from pydantic import BaseModel
from typing import List

router = APIRouter()
mark_api = router
class MarkIn(BaseModel):
    img_id: int

    class Config:
        orm_mode = True

class MarkOut(MarkIn):
    id: int
    user_id: int
    mark_time: str

    class Config:
        orm_mode = True

# 假设的依赖项函数，用于获取当前用户
async def get_current_user():
    # 这里应该是你的用户认证逻辑
    return User.get(id=1)


@router.get("/", response_model=List[MarkOut])
async def list_marks(user: User = Depends(get_current_user)):
    return await MarkOut.from_queryset(Mark.filter(user_id=user.id))

@router.get("/{mark_id}", response_model=MarkOut)
async def get_mark(mark_id: int, user: User = Depends(get_current_user)):
    try:
        mark = await Mark.get(id=mark_id, user_id=user.id)
        return await MarkOut.from_tortoise_orm(mark)
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Mark not found")

@router.put("/{mark_id}", response_model=MarkOut)
async def update_mark(mark_id: int, mark_in: MarkIn, user: User = Depends(get_current_user)):
    await Mark.filter(id=mark_id, user_id=user.id).update(img_id=mark_in.img_id)
    mark = await Mark.get(id=mark_id)
    return await MarkOut.from_tortoise_orm(mark)

@router.delete("/{mark_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mark(mark_id: int, user: User = Depends(get_current_user)):
    deleted_count = await Mark.filter(id=mark_id, user_id=user.id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Mark not found")
    return {"ok": True}
