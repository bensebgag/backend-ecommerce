import { Request, Response } from "express";
import {
  addPoductToChart,
  createProduct,
  deleteFromChart,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "./service.js";

import { customRequest } from "../../util/types.js";
import path from "path";
import { fileURLToPath } from "url";
import { getAuth } from "@clerk/express";
import prisma from "../../config/db.js";
import multer from "multer";
import { parseSizeValues } from "../../util/hellper.js";
import Stripe from "stripe";
import { promises } from "dns";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || " ");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../public/images/");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ex = file.mimetype.split("/")[1];
    cb(null, `product-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ex}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! please upload only images"));
  }
};
export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = "usd" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message });
  }
};

export const getPublickKey = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const publicKey = process.env.STRIPE_SECRET_PUBLIC;
    if (!publicKey)
      res.status(500).json("somthing wrong happen when fetching publicKey");

    return res.status(200).json({ publicKey });
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message });
  }
};

const createProductController = async (
  req: customRequest,
  res: Response
): Promise<any> => {
  const { name, price, description, quantity, categoryName, sizeValues } =
    req.body;

  const images = req.files && req.files.map((file) => file.filename);
  const numericSizes = parseSizeValues(sizeValues);

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  try {
    const finduser = await prisma.user.findUnique({
      where: { Clerkid: userId },
    });
    if (!finduser || finduser.role !== "ADMIN") {
      return res.status(401).json({ error: "User not has a permission " });
    }

    const product = await createProduct(
      name,
      +price,
      description,
      +quantity,
      categoryName,
      sizeValues,
      images
    );

    return res.status(201).json(product);
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal server error while creating product",
      error: err.message,
    });
  }
};

const deleteProductController = async (
  req: customRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  if (!id) return res.status(500).json("please provide an id");

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const finduser = await prisma.user.findUnique({
      where: { Clerkid: userId },
    });
    if (!finduser || finduser.role !== "ADMIN") {
      return res.status(401).json({ error: "User not has a permission " });
    }
    const product = await deleteProduct(+id);

    return res.status(200).json(product);
  } catch (err: any) {
    return res.status(500).json({
      message: "please provide an valid id",
      error: err.message,
    });
  }
};

const getAllProductsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const host = `${req.protocol}://${req.get("host")}`;

    const products = await getAllProducts(+id);
    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      typesChoose: (p.typesChoose as string[]).map((filename) =>
        filename ? `${host}/images/${filename}` : null
      ),
    }));
    return res.status(200).json(result);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Internal server error while getting all products" });
  }
};

const getProductByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const host = `${req.protocol}://${req.get("host")}`;

  if (!id) return res.status(500).json("please provide an id");
  try {
    const Product = await getProductById(+id);
    const result = {
      ...Product,
      typesChoose: (Product?.typesChoose as string[]).map((filename) =>
        filename ? `${host}/images/${filename}` : null
      ),
    };
    return res.status(200).json(result);
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Internal server error while getting product" });
  }
};

const addProductToChartController = async (
  req: customRequest,
  res: Response
): Promise<any> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { id } = req.params;

    const addNewProductToChart = await addPoductToChart(userId, +id);

    return res
      .status(200)
      .json({ message: "product added to chart", chart: addNewProductToChart });
  } catch (err: any) {
    return res.status(500).json({
      message: "Internal server error while adding product to chart",
      error: err.message,
    });
  }
};

const deleteFromChartController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params;
    const { idUser } = req.body;

    if (!idUser || !productId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const product = await deleteFromChart(+productId, idUser);
    return res.status(200).json({
      message: "Product removed from chart",
      removedProduct: product,
    });
  } catch (error: any) {
    console.error("Delete from chart error:", error);

    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  addProductToChartController,
  deleteFromChartController,
};
