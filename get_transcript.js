const fs = require("fs");
const youtubedl = require("youtube-dl");
const webvtt = require("node-webvtt");

const options = {
  auto: true,
  all: false,
  lang: "en",
  cwd: __dirname
};

(async () => {
  const transcripts = [];
  const video = process.argv[2];
  const url = "https://youtu.be/" + video;

  youtubedl.getSubs(url, options, function(err, files) {
    if (err) throw err;
    if (files.length == 0) {
      console.log(
        "no transcripts available, try changing transcript download parameters ..."
      );
    } else {
      processTranscripts(files);
    }
  });

  function processTranscripts(transcripts) {
    for (const i in transcripts) {
      processTranscript(transcripts[i]);
    }
  }

  function processTranscript(ts) {
    const input = fs.readFileSync(ts, "utf8");
    const parsed = webvtt.parse(input);
    const { cues } = parsed;
    const data = cues.map(({ text, start, end }) => {
      return {
        text: text.replace(/(<([^>]+)>)/gi, ""),
        start,
        end
      };
    });

    const content = JSON.stringify({
      ref: video,
      cues: data
    });

    fs.writeFile(`${video}.json`, content, "utf8", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(`Wrote ${video}.json`);
    });
  }
})();
