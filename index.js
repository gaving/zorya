import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import Debug from "debug";

import videos from "./routes/video.route.js";

const debug = Debug("zorya");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/videos", videos);
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Invalid endpoint!");
});

app.listen(process.env.PORT, () => {
  debug(`Listening on ${process.env.PORT}`);
});
