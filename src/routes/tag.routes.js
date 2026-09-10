import express from "express";

import {index,store,show,update,destroy } from "../controllers/tag.controller.js";

const router = express.Router();
router.post("/tags",index)

router.post("/tags",store);

router.get("/tags",show);

router.put("/tags/:id", update);

router.delete("/tags/:id", destroy);

export default router;