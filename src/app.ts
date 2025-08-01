import express, { NextFunction, Response, Request } from "express";
import UserRoute from "./modules/user/routes.js";
import ProductRoute from "./modules/product/routes.js";
import BillRoute from "./modules/bill/routes.js";
import CategoryRoute from "./modules/category/routees.js";
import ReviewsRoute from "./modules/reviews/routes.js";
import ChartRoute from "./modules/chart/routes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { clerkMiddleware } from "@clerk/express";

import cors from "cors";
dotenv.config();

const app = express();

app.use(clerkMiddleware());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/api/v1",
  UserRoute,
  ProductRoute,
  CategoryRoute,
  ReviewsRoute,
  ChartRoute,
  BillRoute
);

const errorHandler: express.ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.statusCode === 401) {
    res.status(401).send("Unauthenticated!");
    return;
  }

  res.status(500).send(err.message);
};

app.use(errorHandler);

export default app;
