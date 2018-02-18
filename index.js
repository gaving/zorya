import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import videos from "./routes/video.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/videos", videos);

app.get("/", (req, res) => {
  res.send("Invalid endpoint!");
});

app.listen(3000, () => {
  console.info("server started - ", 3000);
});
