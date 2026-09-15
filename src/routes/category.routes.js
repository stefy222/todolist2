import express from "express";

import {index,store,show,update,destroy } from "../controllers/category.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.use(authMiddleware);
<<<<<<< HEAD
router.post("/categories",index)

router.post("/categories",store);

router.get("/categories",show);

router.put("/categories/:id", update);

router.delete("/categories/:id", destroy);
=======

router.post("/",index)

router.post("/",store);

router.get("/",show);

router.put("/:id", update);

router.delete("/:id", destroy);
>>>>>>> origin/main

export default router;