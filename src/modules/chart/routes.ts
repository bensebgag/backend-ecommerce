import express from "express";
import {
  createChartController,
  deleteProductFromChartController,
  getChartController,
  syncQuantityController,
} from "./controller.js";

const router = express.Router();
router.get("/chart", getChartController);
router.post("/createChart", createChartController);
router.post("/syncQuantity/:chartProductId", syncQuantityController);
router.delete(
  "/deleteProductFromChart/:idProduct",
  deleteProductFromChartController,
);

export default router;
