import express from "express";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/categories", createCategory);

router.get("/categories", getCategories);

router.put("/categories/:id", updateCategory);

router.delete("/categories/:id", deleteCategory);

export default router;