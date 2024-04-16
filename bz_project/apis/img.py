from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, UploadFile, File
import shutil
from models import Img
from tortoise.exceptions import DoesNotExist

class ImgIn(BaseModel):
    img_source: str
    img_url: str
    img_type: str
    user: str




img_api = APIRouter()

@img_api.get("/", description="根据图片类型查询图片")
async def get_all_imgs(img_type: str = None):
    if img_type:
        imgs = await Img.filter(img_type=img_type).all()  # 过滤 img_type
    else:
        imgs = await Img.all()  # 如果没有提供 img_type，返回所有图片
    return {"result": "查询图片", "data": imgs}

@img_api.get("/{img_id}", description="查询单张图片")
async def get_img(img_id: int):
    img = await Img.get_or_none(id=img_id)


    if img is None:
        raise HTTPException(status_code=404, detail="图片未找到")
    return {"result": "查询单张图片", "data": img}

@img_api.get('/images/{user}', description="查询用户上传记录")
async def get_user_images(user: str):
    try:
        # 获取所有user字段匹配的Img记录
        images = await Img.filter(user=user).all()

        # 构造返回数据，包括Img表的所有字段
        result_data = [{
            'id': image.id,
            'img_source': image.img_source,
            'img_url': image.img_url,
            'img_type': image.img_type,
            'user': image.user,
            'create_time': image.create_time.isoformat(),  # 格式化datetime为字符串
        } for image in images]

        return {"result": "ok", "data": result_data}
    except DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")


@img_api.post("/", description="添加图片")
async def post_img(img_source: str, img_type:str,user:str, file: UploadFile = File(...), ):
    # 保存文件到本地的 statics 文件夹
    file_location = f"statics/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # 创建图片记录并保存文件名到数据库
    img = await Img.create(img_source=img_source, img_url=file_location, img_type=img_type, user=user)

    return {"result": "添加图片成功", "data": img}

@img_api.put("/{img_id}", description="更新图片")
async def update_img(img_id: int, img_in: ImgIn):
    img = await Img.get_or_none(id=img_id)
    if img is None:
        raise HTTPException(status_code=404, detail="图片未找到")

    img.img_source = img_in.img_source
    img.img_url = img_in.img_url
    await img.save()

    return {"result": "更新图片成功", "data": img}

@img_api.delete("/{img_id}", description="删除图片")
async def delete_img(img_id: int):
    img = await Img.get_or_none(id=img_id)
    if img is None:
        raise HTTPException(status_code=404, detail="图片未找到")

    await img.delete()

    return {"result": "删除图片成功"}
