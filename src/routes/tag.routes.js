import express from "express";

import {index,store,show,update,destroy } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/",index)

router.post("/",store);

router.get("/:id",show);

router.put("/:id", update);

router.delete("/:id", destroy);

export default router;