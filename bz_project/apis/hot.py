import datetime

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from tortoise.functions import Count
from tortoise.query_utils import Prefetch
from models import Mark, Img
from tortoise.exceptions import DoesNotExist, IntegrityError

hot_api = APIRouter()

class MarkCreate(BaseModel):
    mark_time: datetime.datetime
    img_id: int
    user_id: int


@hot_api.get('/hot-images')
async def get_hot_images():
    # 获取Mark记录的img_id和计数，并预取相关的Img对象
    hot_images = await Mark.annotate(count=Count('img_id')).group_by('img_id').order_by('-count').prefetch_related('img')

    # 构造返回数据，包括Img表的所有字段
    result_data = []
    if len(hot_images) > 50:
        max_len = 50
    else:
        max_len = len(hot_images) - 1
    for mark in hot_images[:max_len]:
        img_data = await mark.img  # 这里我们获取关联的Img对象
        result = {
            'img_id': mark.img_id,
            'count': mark.count,
            'img': {
                'id': img_data.id,
                'img_source': img_data.img_source,
                'img_url': img_data.img_url,
                'img_type': img_data.img_type,
                'user': img_data.user,
                'create_time': img_data.create_time.isoformat(),  # 格式化datetime为字符串
            }
        }
        result_data.append(result)

    return {"result": "ok", "data": result_data}


@hot_api.get('/user-marks/{user_id}')
async def get_user_marks(user_id: int):
    try:
        # 获取所有user_id匹配的Mark记录，并预取关联的Img对象
        marks = await Mark.filter(user_id=user_id).prefetch_related('img')

        # 构造返回数据，包括Img表的所有字段
        result_data = []
        for mark in marks:
            img_data = mark.img
            result = {
                'mark_id': mark.id,
                'user_id': mark.user_id,
                'mark_time': mark.mark_time.isoformat(),  # 格式化datetime为字符串
                'img': {
                    'id': img_data.id,
                    'img_source': img_data.img_source,
                    'img_url': img_data.img_url,
                    'img_type': img_data.img_type,
                    'user': img_data.user,
                    'create_time': img_data.create_time.isoformat(),  # 格式化datetime为字符串
                }
            }
            result_data.append(result)

        return {"result": "ok", "data": result_data}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

@hot_api.post('/create-mark', status_code=status.HTTP_201_CREATED)
async def create_mark(mark_data: MarkCreate):
    # 验证img_id是否存在
    img_exists = await Img.filter(id=mark_data.img_id).exists()
    if not img_exists:
        raise HTTPException(status_code=404, detail="Image not found")

    # 创建新的Mark记录
    try:
        mark = await Mark.create(
            mark_time=mark_data.mark_time,
            img_id=mark_data.img_id,
            user_id=mark_data.user_id
        )
        return {"result": "ok", "mark_id": mark.id}
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail=str(e))