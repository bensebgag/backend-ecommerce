import express from 'express';
import {createCategoryController, getAllCategoriesController} from "./controller.js";
import {ClerkExpressWithAuth} from "@clerk/clerk-sdk-node";
const router = express.Router();
router.use(ClerkExpressWithAuth())

router.post("/createCategory",createCategoryController);
router.get("/getAllCategories",getAllCategoriesController);

export default router;