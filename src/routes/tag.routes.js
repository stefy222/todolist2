import express from "express";

import {index,store,show,update,destroy } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/tags",index)

router.post("/tags",store);

router.get("/tags",show);

router.put("/tags/:id", update);

router.delete("/tags/:id", destroy);

export default router;