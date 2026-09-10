import express from "express";

import {index,store,show,update,destroy } from "../controllers/category.controller.js";

const router = express.Router();
router.post("/categories",index)

router.post("/categories",store);

router.get("/categories",show);

router.put("/categories/:id", update);

router.delete("/categories/:id", destroy);

export default router;