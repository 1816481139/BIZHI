import datetime
from tortoise.models import Model
from tortoise import fields
from tortoise.fields.relational import ForeignKeyField, ManyToManyField

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True, description="用户名")  # 确保用户名是唯一的
    password = fields.CharField(max_length=50, description="密码")
    uploads = fields.ReverseRelation["Upload"]
    marks = fields.ManyToManyRelation["Img"]
    downloads = fields.ManyToManyRelation["Img"]

class Img(Model):
    id = fields.IntField(pk=True, description="图片ID")
    img_source = fields.CharField(max_length=50, description="图片来源")
    img_url = fields.CharField(max_length=255, description="图片地址")
    img_type = fields.CharField(max_length=50, description="图片分类")
    user = fields.CharField(max_length=50, description="用户")
    create_time = fields.DatetimeField(default=datetime.datetime.now)
    uploaded_by = fields.ReverseRelation["Upload"]
    marked_by = fields.ManyToManyRelation["User"]
    downloaded_by = fields.ManyToManyRelation["User"]

class Mark(Model):
    id = fields.IntField(pk=True, description="收藏ID")
    user = ForeignKeyField("models.User", related_name="marks")
    img = ForeignKeyField("models.Img", related_name="marked_by")
    mark_time = fields.DatetimeField(default=datetime.datetime.now)

class Download(Model):
    id = fields.IntField(pk=True, description="下载记录ID")
    user = ForeignKeyField("models.User", related_name="downloads")
    img = ForeignKeyField("models.Img", related_name="downloaded_by")
    download_time = fields.DatetimeField(auto_now_add=True)

class Upload(Model):
    id = fields.IntField(pk=True, description="上传记录ID")
    user = ForeignKeyField("models.User", related_name="uploads")
    img = ForeignKeyField("models.Img", related_name="uploads")
    upload_time = fields.DatetimeField(auto_now_add=True)
