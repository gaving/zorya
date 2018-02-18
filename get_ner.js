const fs = require("fs");
const request = require("request-promise");

(async () => {
  const video = process.argv[2];
  const options = {
    uri: "http://localhost:8080/ent",
    method: "POST"
  };

  const data = JSON.parse(fs.readFileSync(video, "utf8"));
  const results = [];
  const { ref, cues } = data;

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

  const content = JSON.stringify({
    ref,
    entities: results
  });

  fs.writeFile(`${ref}_ner.json`, content, "utf8", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(`Wrote ${ref}_ner.json`);
  });
})();
