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
        products: {
          include: {
            product: true,
          },
        },
        bill: true,
      },
    });

    if (!chart) {
      throw new Error("Chart not found or unauthorized access");
    }

    if (chart.bill) {
      throw new Error("Cannot modify chart with existing bill");
    }

    if (chart.products.length === 0) {
      throw new Error("No products in the chart to delete");
    }
    await prisma.$transaction(async (prisma) => {
      const productToDelete = chart.products.find(
        (product) => product.productId === productId
      )?.product;
      await prisma.chart.update({
        where: {
          id: chart.id,
        },
        data: {
          orderAmount: chart.orderAmount - (productToDelete?.price || 0),
          totalPayment: chart.totalPayment - (productToDelete?.price || 0),
        },
      });
      await prisma.chartProduct.delete({
        where: {
          chartId_productId: {
            chartId,
            productId,
          },
        },
      });
    });

    return {
      success: true,
      message: "Product deleted from chart successfully",
    };
  } catch (err) {
    throw err;
  }
};

export { create, getByUserId, delteProduct };
