from pydantic import BaseModel
from datetime import datetime

class DownloadIn(BaseModel):
    img_id: int

    class Config:
        orm_mode = True

class DownloadOut(DownloadIn):
    id: int
    user_id: int
    download_time: datetime

    class Config:
        orm_mode = True


from fastapi import APIRouter, HTTPException, Depends, status
from models import Download, User, Img
from tortoise.exceptions import DoesNotExist
from typing import List

router = APIRouter()
download_api = router
# 依赖项函数，用于获取当前用户
async def get_current_user():
    # 这里应该是你的用户认证逻辑
    return User.get(id=1)

@router.post("/", response_model=DownloadOut, status_code=status.HTTP_201_CREATED)
async def create_download(download_in: DownloadIn, user: User = Depends(get_current_user)):
    download = await Download.create(user=user, img_id=download_in.img_id)
    return await DownloadOut.from_tortoise_orm(download)

@router.get("/", response_model=List[DownloadOut])
async def list_downloads(user: User = Depends(get_current_user)):
    return await DownloadOut.from_queryset(Download.filter(user_id=user.id))

@router.get("/{download_id}", response_model=DownloadOut)
async def get_download(download_id: int, user: User = Depends(get_current_user)):
    try:
        download = await Download.get(id=download_id, user_id=user.id)
        return await DownloadOut.from_tortoise_orm(download)
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="Download not found")

@router.put("/{download_id}", response_model=DownloadOut)
async def update_download(download_id: int, download_in: DownloadIn, user: User = Depends(get_current_user)):
    await Download.filter(id=download_id, user_id=user.id).update(img_id=download_in.img_id)
    download = await Download.get(id=download_id)
    return await DownloadOut.from_tortoise_orm(download)

@router.delete("/{download_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_download(download_id: int, user: User = Depends(get_current_user)):
    deleted_count = await Download.filter(id=download_id, user_id=user.id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Download not found")
    return {"ok": True}
