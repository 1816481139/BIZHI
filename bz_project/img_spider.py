import asyncio
import os

import aiomysql
from urllib.parse import quote
from datetime import datetime

import pymysql
import requests

db = pymysql.connect(host='116.205.167.188', port=3306, user='bzgl_admin', password='Bzgl123123..', db='bz_data')
cursor = db.cursor()


def fetch_and_insert_data():
    img_flag_list = [
        "美女壁纸", "游戏壁纸", "人物明星", "动漫壁纸", "植物多肉", "搞笑萌宠",
        "人文艺术", "家居生活", "美食菜谱", "手工DIY", "时尚搭配", "美妆造型",
        "文字句子", "插画绘画", "设计", "古风", "壁纸", "旅行", "头像", "素材"
    ]

    for imgflag in img_flag_list:
        url = f"https://www.duitang.com/napi/blogv2/list/by_search/?kw={imgflag}&after_id=00&type=feed&include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Clike_id%2Csender%2Calbum%2Creply_count%2Cfavorite_blog_id&_type=&_=1653556378347"
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
        }
        r = requests.get(url, headers=headers).json()
        print(r)
        count = 0
        for i in r.get("data").get("object_list"):
            count += 1
            c = i.get("album")
            img_id = c.get("id")
            img_name = c.get("name")
            img_url = c.get("covers")[0]
            print(img_id, img_name, img_url)
            if imgflag not in os.listdir("statics"):
                os.mkdir("statics/"+imgflag)
            f_name = "statics/" + imgflag.replace(" ", "")
            page_dir = count // 10 + 1
            if str(page_dir) not in os.listdir(f_name):
                os.mkdir(f_name + "/" +str(page_dir))

            file_name = f"{f_name}/{page_dir}/" +img_url.split("/")[-1]
            ff = open(file_name, "wb+")
            ff.write(requests.get(img_url).content)
            ff.close()
            created_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            sql = "INSERT INTO img(img_source,img_url,create_time,img_type,user) values (%s,%s,%s,%s,%s)"
            cursor.execute(sql, (img_name, file_name, created_time, imgflag, "spider"))
            db.commit()


if __name__ == '__main__':
    fetch_and_insert_data()