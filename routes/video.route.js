import express from "express";
import asyncHandler from "express-async-handler";
import Debug from "debug";

import { transcript, ner, neo } from "../lib/index.js";

const debug = Debug("zorya");
const router = express.Router();

router.post(
  "/new",
  asyncHandler(async (req, res, next) => {
    const { video } = req.body;
    debug(`Received ${video}`);
    res.send({ message: `${video} queued` });
    await neo(video, await ner(await transcript(video)));
  })
);

export default router;
