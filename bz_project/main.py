import uvicorn
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from apis.hot import hot_api
from apis.upload import upload_api
from settings import TORTOISE_ORM
from apis.users import user_api
from apis.img import img_api
from apis.mark import mark_api
from apis.download import download_api
from apis.login import login_api
from fastapi.staticfiles import StaticFiles


app = FastAPI()




register_tortoise(
    app=app,
    config=TORTOISE_ORM
)

app.mount("/statics", StaticFiles(directory="statics"), name="statics")
app.include_router(login_api, prefix="/login", tags=["登陆api"])
app.include_router(user_api, prefix="/users", tags=["用户管理api"])
app.include_router(img_api, prefix="/img", tags=["图片管理api"])
app.include_router(mark_api, prefix="/mark", tags=["收藏记录管理api"])
app.include_router(upload_api, prefix="/upload", tags=["上传记录管理api"])
app.include_router(download_api, prefix="/download", tags=["下载记录管理api"])
app.include_router(hot_api, prefix="/hot", tags=["热门"])



if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8089)