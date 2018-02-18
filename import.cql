// CREATE
//  (v:Video { title: 'The God Debate', ref: 'bAdNSg8q2kI' }),
//  (v2:Video { title: 'The God Debate II', ref: 'QAdNSg8q2kI' }),
//  (p:Person { title: 'Christopher Hitchens' },
//  (p)->[:REFERENCES{start: 142, end: 160}]->(v)
//  (p)->[:REFERENCES{start: 170, end: 160}]->(v2)

// {
//     "text": "Abraham Lincoln",
//     "start": 169.9,
//     "end": 176.14,
//     "type": "PERSON"
// },

// TYPE	DESCRIPTION
// PERSON	People, including fictional.
// NORP	Nationalities or religious or political groups.
// FACILITY	Buildings, airports, highways, bridges, etc.
// ORG	Companies, agencies, institutions, etc.
// GPE	Countries, cities, states.
// LOC	Non-GPE locations, mountain ranges, bodies of water.
// PRODUCT	Objects, vehicles, foods, etc. (Not services.)
// EVENT	Named hurricanes, battles, wars, sports events, etc.
// WORK_OF_ART	Titles of books, songs, etc.
// LAW	Named documents made into laws.
// LANGUAGE	Any named language.
// DATE	Absolute or relative dates or periods.
// TIME	Times smaller than a day.
// PERCENT	Percentage, including "%".
// MONEY	Monetary values, including unit.
// QUANTITY	Measurements, as of weight or distance.
// ORDINAL	"first", "second", etc.
// CARDINAL	Numerals that do not fall under another type.


CALL apoc.periodic.iterate("
    CALL apoc.load.json('file:///var/lib/neo4j/import/ObpgbpRraeU_ner.json')
    YIELD value AS parsedResponse RETURN parsedResponse
", "
MERGE (v:Video {ref: parsedResponse.ref}) 

FOREACH(entity IN parsedResponse.entities |

    // Person
    FOREACH(_ IN CASE WHEN entity.type = 'PERSON' THEN [1] ELSE [] END |
        MERGE (p:Person {name: entity.text})
        MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
    )

    // NORP
    FOREACH(_ IN CASE WHEN entity.type = 'NORP' THEN [1] ELSE [] END |
        MERGE (p:NORP {name: entity.text})
        MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
    )

    // GPE
    FOREACH(_ IN CASE WHEN entity.type = 'GPE' THEN [1] ELSE [] END |
        MERGE (p:GPE {name: entity.text})
        MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
    )

    // ORG
    FOREACH(_ IN CASE WHEN entity.type = 'ORG' THEN [1] ELSE [] END |
        MERGE (p:ORG {name: entity.text})
        MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
    )
)",
{
    batchSize: 10000,
    iterateList: true
}
);