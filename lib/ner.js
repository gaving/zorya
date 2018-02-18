const fs = require("fs");
const request = require("request-promise");

export default async cues => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        uri: "http://localhost:8080/ent",
        method: "POST"
      };

      const results = [];

      for (let cue of cues) {
        const { text } = cue;

        options.json = {
          text
        };

        try {
          const response = await request.post(options);
          if (response.length > 0) {
            const { text, type } = response.pop();
            cue.text = text;
            cue.type = type;
            results.push(cue);
          }
        } catch (error) {
          // console.log(error);
        }
      }

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
