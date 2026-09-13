import express from "express";

import {index,store,show,update,destroy } from "../controllers/task.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/task",index)

router.post("/task",store);

router.get("/task",show);

router.put("/task/:id", update);

router.delete("/task/:id", destroy);

export default router;