import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import winston from "winston";
import expressWinston from "express-winston";
import dotenv from "dotenv";
import videos from "./routes/video.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/videos", videos);

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ],
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true
  })
);

app.get("/", (req, res) => {
  res.send("Invalid endpoint!");
});

app.listen(process.env.PORT, () => {
  console.info(`Listening on ${process.env.PORT}`);
});
