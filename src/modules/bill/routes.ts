import express from "express";
import {
  createNewBillController,
  handleStripeWebhook,
  getAllBillController,
} from "./controller.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);
router.post("/createNewBill", ClerkExpressWithAuth(), createNewBillController);
router.get("/getAllBill", ClerkExpressWithAuth(), getAllBillController);
export default router;
