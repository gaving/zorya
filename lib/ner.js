import request from "request-promise";
import Debug from "debug";

const debug = Debug("zorya");

export default async cues => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        uri: `${process.env.SPACY_URI}ent`,
        method: "POST"
      };

      const results = [];
      debug(`Extracting entities from cues`);

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
          debug(error);
        }
      }

      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
