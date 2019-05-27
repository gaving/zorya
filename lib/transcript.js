import fs from "fs";
import path from "path";
import util from "util";

import youtubedl from "youtube-dl";
import webvtt from "node-webvtt-youtube";

export default async video => {
  const url = "https://youtu.be/" + video;
  const getSubs = util.promisify(youtubedl.getSubs);

  return new Promise(async (resolve, reject) => {
    const files = await getSubs(url, {
      auto: true,
      all: false,
      lang: "en",
      cwd: path.dirname(new URL(import.meta.url).pathname)
    });

    if (files.length == 0) {
      reject("No transcripts available");
      return;
    }

    const file = files.pop();
    const input = fs.readFileSync(`./lib/${file}`, "utf8");
    const parsed = webvtt.parse(input);
    const { cues } = parsed;
    const data = cues.map(({ text, start, end }) => {
      return {
        text: text.replace(/(<([^>]+)>)/gi, ""),
        start,
        end
      };
    });

    fs.unlinkSync(`./lib/${file}`);

    resolve(data);
  });
};
