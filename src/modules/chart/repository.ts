import prisma from "../../config/db.js";
import { CreateChartInput } from "../../util/types.js";

const create = async (data: CreateChartInput) => {
  try {
    return await prisma.chart.create({
      data: {
        userId: data.userId,
        orderAmount: data.orderAmount,
        discount: data.discount || 0,
        totalPayment: data.totalPayment,
        billId: data.billId,
        products: {
          create: data.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        userowner: true,
        bill: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getByUserId = async (id: string) => {
  try {
    return await prisma.chart.findFirst({
      where: {
        userId: id,
        bill: null,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

const delteProduct = async (
  userId: string,
  chartId: number,
  productId: number
) => {
  try {
    const chart = await prisma.chart.findUnique({
      where: {
        id: chartId,
        userId,
      },
      include: {
        bill: true,
      },
    });

    if (!chart) {
      throw new Error("Invalid chart ID or unauthorized access");
    }
    if (chart.bill) {
      throw new Error("Cannot modify chart with existing bill");
    }
    await prisma.$transaction(async (prisma) => {
      await prisma.chartProduct.delete({
        where: {
          chartId_productId: {
            chartId,
            productId,
          },
        },
      });
      await prisma.chart.delete({
        where: {
          id: chartId,
          userId,
        },
      });
    });
  } catch (err) {
    throw err;
  }
};

export { create, getByUserId, delteProduct };
