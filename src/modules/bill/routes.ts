import express from "express";
import {
  createNewBillController,
  handleStripeWebhook,
  getAllBillController,
} from "./controller.js";

const router = express.Router();
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);
router.post("/createNewBill", createNewBillController);
router.get("/getAllBill", getAllBillController);
export default router;
