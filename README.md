# Zorya

Tool for visualizing named entities from a YouTube video.

![](https://raw.githubusercontent.com/gaving/zorya/master/site/1.png)

## Run

`docker-compose up`

### Usage

- `http POST :3000/videos/new video=uwbpcTrsmaI`

```json
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 32
Content-Type: application/json; charset=utf-8
Date: Tue, 13 Mar 2018 08:46:32 GMT
ETag: W/"20-vNuP419kHmtKc9Kq9n9yXAUsw4g"
X-Powered-By: Express

{
    "message": "uwbpcTrsmaI queued"
}
```

- Launch http://localhost:7474/
