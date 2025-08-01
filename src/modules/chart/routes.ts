import express from "express";
import {
  createChartController,
  deleteProductFromChartController,
  getChartController,
} from "./controller.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.use(ClerkExpressWithAuth());
router.get("/chart", getChartController);
router.post("/createChart", createChartController);
router.delete(
  "/deleteProductFromChart/:idProduct",
  deleteProductFromChartController
);

export default router;
