import requests

url = "https://c-ssl.duitang.com/uploads/blog/202305/25/d3SJp3z6hqM54WV.jpg"

file_name = url.split("/")[-1]
ff = open("statics/" + file_name, "wb+")
ff.write(requests.get(url).content)
ff.close()