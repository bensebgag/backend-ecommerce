import express from "express";
import { createReviewController } from "./controller.js";
const router = express.Router();
router.post("createReview", createReviewController);
export default router;
