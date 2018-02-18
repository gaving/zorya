const fs = require("fs");
const request = require("request-promise");

export default async (video, entities) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        uri: "http://localhost:7474/db/data/transaction/commit",
        method: "POST"
      };

      const query = `
      UNWIND {data} as parsedResponse
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
    )
    `;

      const params = { data: [{ ref: video, entities }] };

      options.json = {
        statements: [{ statement: query, parameters: params }]
      };

      const response = await request.post(options);
      resolve(response.results);
    } catch (error) {
      reject(error);
    }
  });
};
