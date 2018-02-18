# Graph Transcript

Service idea:-

* Download youtube transcripts with youtube-dl getSubs()
* Convert VTT file into JSON
* NLP with spacy

docker run -p 8080:80 jgontrum/spacyapi:en_v2

# UI

UI ideas:-

* Box that takes youtube URL
* Fires it into service which builds graph
* NLP transcript

build_graph < nlp_data.json

POS speech data? (/dep/)
ENT (/ent/)
Clear graph every time?
Put time data on the relationships not the nodes
Create nodes of videos

Dockerize it all so you can just throw a video at a service and view it in the interface

```
docker run -e NEO4J_AUTH=none \
  -e NEO4J_dbms_security_procedures_unrestricted=apoc.\\\* \
  -e NEO4J_apoc_import_file_enabled=true \
  -e NEO4J_dbms_memory_pagecache_size=4G \
  -e NEO4J_dbms_memory_heap_maxSize=4G \
  --rm \
  --name neo4j \
  --publish=7474:7474 \
  --publish=7687:7687 \
  -v ./data:/data \
  -v ./import:/var/lib/neo4j/import \
  -v ./plugins:/plugins \
  -v ./conf:/var/lib/neo4j/conf \
  neo4j
```
