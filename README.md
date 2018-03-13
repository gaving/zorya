# Graph Transcript

Tool for visualizing named entities from a YouTube video.

![](https://raw.githubusercontent.com/gaving/graph-transcript/master/site/1.png)

## Installation

### Run Services

#### Spacy

`docker run -p 8080:80 jgontrum/spacyapi:en_v2`

#### Neo4j

`docker run -e NEO4J_AUTH=none --rm --name graph-transcript --publish=7474:7474 --publish=7687:7687 neo4j`

### Run Service

* `yarn`
* `yarn start`

### Usage

* `http POST :3000/videos/new video=<video id>`

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 32
Content-Type: application/json; charset=utf-8
Date: Tue, 13 Mar 2018 08:46:32 GMT
ETag: W/"20-vNuP419kHmtKc9Kq9n9yXAUsw4g"
X-Powered-By: Express

{
    "message": "c0jPryEaR3w queued"
}
```

* View in Neo4j

## Overview

* Download youtube transcripts with youtube-dl getSubs()
* Convert VTT file into JSON
* NLP VTT file with spacy
* Load NLP data into Neo4j instance (time data on the relationships not the nodes)
