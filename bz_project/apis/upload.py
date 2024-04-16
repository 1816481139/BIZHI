from pydantic import BaseModel
from datetime import datetime

class UploadIn(BaseModel):
    img_id: int

    class Config:
        orm_mode = True

class UploadOut(UploadIn):
    id: int
    user_id: int
    upload_time: datetime

    class Config:
        orm_mode = True



from fastapi import APIRouter, HTTPException, Depends, status
from models import Upload, User, Img
from tortoise.exceptions import DoesNotExist
from typing import List

router = APIRouter()
upload_api = router
# 依赖项函数，用于获取当前用户
async def get_current_user():
    # 这里应该是你的用户认证逻辑
    return User.get(id=1)

@router.post("/", response_model=UploadOut, status_code=status.HTTP_201_CREATED)
async def create_upload(upload_in: UploadIn, user: User = Depends(get_current_user)):
    upload = await Upload.create(user=user, img_id=upload_in.img_id)
    return await UploadOut.from_tortoise_orm(upload)

@router.get("/", response_model=List[UploadOut])
async def list_uploads(user: User = Depends(get_current_user)):
    return await UploadOut.from_queryset(Upload.filter(user_id=user.id))

@router.get("/{upload_id}", response_model=UploadOut)
async def get_upload(upload_id: int, user: User = Depends(get_current_user)):
    try:
        upload = await Upload.get(id=upload_id, user_id=user.id)
        return await UploadOut.from_tortoise_orm(upload)
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Upload not found")

@router.put("/{upload_id}", response_model=UploadOut)
async def update_upload(upload_id: int, upload_in: UploadIn, user: User = Depends(get_current_user)):
    await Upload.filter(id=upload_id, user_id=user.id).update(img_id=upload_in.img_id)
    upload = await Upload.get(id=upload_id)
    return await UploadOut.from_tortoise_orm(upload)

@router.delete("/{upload_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_upload(upload_id: int, user: User = Depends(get_current_user)):
    deleted_count = await Upload.filter(id=upload_id, user_id=user.id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Upload not found")
    return {"ok": True}