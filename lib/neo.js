import request from "request-promise";

// TYPE         DESCRIPTION
// PERSON       People, including fictional.
// NORP         Nationalities or religious or political groups.
// FACILITY     Buildings, airports, highways, bridges, etc.
// ORG          Companies, agencies, institutions, etc.
// GPE          Countries, cities, states.
// LOC          Non-GPE locations, mountain ranges, bodies of water.
// PRODUCT      Objects, vehicles, foods, etc. (Not services.)
// EVENT        Named hurricanes, battles, wars, sports events, etc.
// WORK_OF_ART  Titles of books, songs, etc.
// LAW          Named documents made into laws.
// LANGUAGE     Any named language.
// DATE         Absolute or relative dates or periods.
// TIME         Times smaller than a day.
// PERCENT      Percentage, including "%".
// MONEY        Monetary values, including unit.
// QUANTITY     Measurements, as of weight or distance.
// ORDINAL      "first", "second", etc.
// CARDINAL     Numerals that do not fall under another type.

export default async (video, entities) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `
UNWIND {data} as parsedResponse
MERGE (v:Video {ref: parsedResponse.ref}) 

FOREACH(entity IN parsedResponse.entities |
  // Person
  FOREACH(_ IN CASE WHEN entity.type = 'PERSON' THEN [1] ELSE [] END |
      MERGE (p:Person {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // NORP
  FOREACH(_ IN CASE WHEN entity.type = 'NORP' THEN [1] ELSE [] END |
      MERGE (p:NORP {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // FACILITY
  FOREACH(_ IN CASE WHEN entity.type = 'FACILITY' THEN [1] ELSE [] END |
      MERGE (p:FACILITY {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // ORG
  FOREACH(_ IN CASE WHEN entity.type = 'ORG' THEN [1] ELSE [] END |
      MERGE (p:ORG {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // GPE
  FOREACH(_ IN CASE WHEN entity.type = 'GPE' THEN [1] ELSE [] END |
      MERGE (p:GPE {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // LOC
  FOREACH(_ IN CASE WHEN entity.type = 'LOC' THEN [1] ELSE [] END |
      MERGE (p:LOC {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // PRODUCT
  FOREACH(_ IN CASE WHEN entity.type = 'PRODUCT' THEN [1] ELSE [] END |
      MERGE (p:PRODUCT {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // EVENT
  FOREACH(_ IN CASE WHEN entity.type = 'EVENT' THEN [1] ELSE [] END |
      MERGE (p:EVENT {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // WORK_OF_ART
  FOREACH(_ IN CASE WHEN entity.type = 'WORK_OF_ART' THEN [1] ELSE [] END |
      MERGE (p:WORK_OF_ART {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // LAW
  FOREACH(_ IN CASE WHEN entity.type = 'LAW' THEN [1] ELSE [] END |
      MERGE (p:LAW {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // LANGUAGE
  FOREACH(_ IN CASE WHEN entity.type = 'LANGUAGE' THEN [1] ELSE [] END |
      MERGE (p:LANGUAGE {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // DATE
  FOREACH(_ IN CASE WHEN entity.type = 'DATE' THEN [1] ELSE [] END |
      MERGE (p:DATE {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )

  // TIME
  FOREACH(_ IN CASE WHEN entity.type = 'TIME' THEN [1] ELSE [] END |
      MERGE (p:TIME {name: toUpper(entity.text)})
      MERGE (p)-[:REFERENCES{start: entity.start, end: entity.end}]->(v)
  )
)
    `;

      const params = { data: [{ ref: video, entities }] };

      const options = {
        uri: `${process.env.NEO4J_URI}db/data/transaction/commit`,
        method: "POST",
        json: {
          statements: [{ statement: query, parameters: params }]
        }
      };

      const response = await request.post(options);
      console.log(`Loaded graph data for ${video}`);
      resolve(response.results);
    } catch (error) {
      reject(error);
    }
  });
};
