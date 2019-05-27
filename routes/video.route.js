import express from "express";
import asyncHandler from "express-async-handler";

import { transcript, ner, neo } from "../lib/index.js";

const router = express.Router();

router.post(
  "/new",
  asyncHandler(async (req, res, next) => {
    const { video } = req.body;
    res.send({ message: `${video} queued` });
    await neo(video, await ner(await transcript(video)));
  })
);

export default router;
