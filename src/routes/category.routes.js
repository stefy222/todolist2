import express from "express";

import {index,store,show,update,destroy } from "../controllers/category.controller.js";

const router = express.Router();
router.post("/",index)

router.post("/",store);

router.get("/",show);

router.put("/:id", update);

router.delete("/:id", destroy);

export default router;