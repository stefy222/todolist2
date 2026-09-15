import express from "express";

import {index,store,show,update,destroy } from "../controllers/task.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authMiddleware);
<<<<<<< HEAD
router.post("/task",index)

router.post("/task",store);

router.get("/task",show);

router.put("/task/:id", update);

router.delete("/task/:id", destroy);
=======

router.post("/",index)

router.post("/",store);

router.get("/",show);

router.put("/:id", update);

router.delete("/:id", destroy);
>>>>>>> origin/main

export default router;