import { Request } from "express";

export interface customRequest extends Request {
  user?: {
    id: string;
    role?: "ADMIN" | "USER";
  };
}

export type CreateChartInput = {
  userId: string;
  orderAmount: number;
  discount?: number;
  totalPayment: number;
  billId?: number;
  products: {
    productId: number;
    quantity: number;
    size: number;
    image: string;
  }[];
};

export type ChartRequestBody = Omit<CreateChartInput, "userId">;
