import express from "express";

import {index,store,show,update,destroy } from "../controllers/task.controller.js";

const router = express.Router();
router.post("/task",index)

router.post("/task",store);

router.get("/task",show);

router.put("/task/:id", update);

router.delete("/task/:id", destroy);

export default router;