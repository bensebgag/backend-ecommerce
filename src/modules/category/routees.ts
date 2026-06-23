import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "./controller.js";
const router = express.Router();

router.post("/createCategory", createCategoryController);
router.get("/getAllCategories", getAllCategoriesController);

export default router;
