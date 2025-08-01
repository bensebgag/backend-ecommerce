import express from "express";
import {authenticateToken} from "../../middleware/auth.js";
import {createReviewController} from "./controller.js";

const router = express.Router();

router.post("createReview",createReviewController);

export default router;