import {
  addProductToChartController,
  createPaymentIntent,
  createProductController,
  deleteFromChartController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  getPublickKey,
  upload,
} from "./controller.js";

import express from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

//router.use(ClerkExpressWithAuth())
router.post(
  "/createNewProduct",
  upload.array("images"),
  createProductController
);
router.delete("/deleteProduct/:id", deleteProductController);
router.get("/getAllProducts/:id", getAllProductsController);
router.get("/getProductById/:id", getProductByIdController);
router.post("/addProductToChart/:id", addProductToChartController);
router.delete("/removeFromChart/:productId", deleteFromChartController);
router.post("/create-intent", createPaymentIntent);
router.get("/publicKeyStrip", getPublickKey);
export default router;
