import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import videos from "./routes/video.route";

dotenv.config();

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
  console.info(`Listening on ${process.env.PORT}`);
});
