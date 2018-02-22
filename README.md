# Graph Transcript

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

## Overview

* Download youtube transcripts with youtube-dl getSubs()
* Convert VTT file into JSON
* NLP VTT file with spacy
* Load NLP data into Neo4j instance (time data on the relationships not the nodes)

## UI

* Box that takes youtube URL
* Fires it into service which builds graph
* NLP transcript
* Hitchhiker
* Sam harris

## TODO

* Take books?
* Take articles?
