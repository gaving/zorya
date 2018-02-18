const fs = require("fs");
const youtubedl = require("youtube-dl");
const webvtt = require("node-webvtt-youtube");

const options = {
  auto: true,
  all: false,
  lang: "en",
  cwd: __dirname
};

export default async video => {
  const transcripts = [];
  const url = "https://youtu.be/" + video;

  return new Promise((resolve, reject) => {
    youtubedl.getSubs(url, options, (err, files) => {
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
      const input = fs.readFileSync(`./lib/${ts}`, "utf8");
      const parsed = webvtt.parse(input);
      const { cues } = parsed;
      const data = cues.map(({ text, start, end }) => {
        return {
          text: text.replace(/(<([^>]+)>)/gi, ""),
          start,
          end
        };
      });

      resolve(data);
    }
  });
};
