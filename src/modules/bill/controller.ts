import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import Stripe from "stripe";
import { createNewBill, getAllBill } from "./service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || " ");

export const handleStripeWebhook = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sig = req.headers["stripe-signature"] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
  }
  res.status(200).json({ received: true });
};

export const createNewBillController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = getAuth(req);
    const { chartId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!chartId) {
      return res.status(400).json({ error: "Please Provide a valid chart" });
    }
    const newInvice = `INV-${Date.now()}`;
    const newBill = await createNewBill(userId, newInvice, +chartId);
    res.status(201).json({ newBill, message: "bill created succefully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error while create new bill ",
    });
  }
};

export const getAllBillController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const allBill = await getAllBill(userId);
    const host = `${req.protocol}://${req.get("host")}`;
    const transformedBills = allBill.map((b) => {
      let billImages: (string | null)[][] | undefined = undefined;

      if (b.chart && b.chart.products) {
        billImages = b.chart.products.map((item) => {
          if (item.product && Array.isArray(item.product.typesChoose)) {
            return (item.product.typesChoose as string[]).map((filename) =>
              filename ? `${host}/images/${filename}` : null
            );
          }
          return [];
        });
      }

      return {
        id: b.id,
        date: b.createdAt,
        Invoice: b.Invoice,
        images: billImages?.flat() ?? [],
      };
    });

    res.status(200).json(transformedBills);
  } catch (err) {
    res.status(500).json({
      message: "Internal server error while create new bill ",
    });
  }
};
