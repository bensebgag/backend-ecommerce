import prisma from "../../config/db.js";
import { createChart } from "../chart/service.js";

const create = async (
  name: string,
  price: number,
  description: string,
  quantity: number,
  categoryName: string,
  sizeValues: number[],
  typesChoose: Record<string, any> = {}
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Handle category (your existing code)
    const category = await tx.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    // 2. Create the product first
    const product = await tx.product.create({
      data: {
        name,
        price,
        description,
        quantity,
        typesChoose,
        categoryId: category.id,
      },
      include: { category: true },
    });
    if (typeof sizeValues === "string") {
      try {
        sizeValues = JSON.parse(sizeValues);
      } catch (error) {
        throw new Error("Invalid sizeValues format");
      }
    }

    // 3. Create the size records for this product
    if (sizeValues && sizeValues.length > 0) {
      await tx.productSize.createMany({
        data: sizeValues.map((size) => ({
          productId: product.id,
          size: Number(size), // Ensure size is converted to a number
          quantity: 0,
          price: price,
        })),
        skipDuplicates: true,
      });
    } // 4. Return the product with its sizes
    return tx.product.findUnique({
      where: { id: product.id },
      include: {
        category: true,
        availableSizes: true,
      },
    });
  });
};
const deleteP = async (id: number) => {
  return prisma.product.delete({
    where: { id: id },
  });
};

const getAll = async (query?: number) => {
  if (query === undefined || query === null || isNaN(query)) {
    return prisma.product.findMany();
  } else {
    return prisma.product.findMany({ where: { categoryId: query } });
  }
};

const getById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id: id },
    include: {
      availableSizes: true,
      reviews: true,
    },
  });
};

const addProduct = async (userId: string, productId: number, quantity = 1) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    if (product.quantity === 0) {
      throw new Error(`Product with id ${productId} is out of stock`);
    }

    const activeChart = await prisma.chart.findFirst({
      where: {
        userId: userId,
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

    if (!activeChart) {
      const newChart = await createChart({
        userId,
        orderAmount: product.price,
        totalPayment: product.price,
        discount: 0,
        products: [{ productId, quantity }],
      });
      return newChart;
    }

    const existProductInChart = activeChart.products.find(
      (product) => product.product.id === productId
    );

    if (existProductInChart) {
      const updateChart = await prisma.chart.update({
        where: {
          id: activeChart.id,
          userId: userId,
        },
        data: {
          totalPayment:
            activeChart.totalPayment + existProductInChart.product.price,
          orderAmount:
            activeChart.orderAmount + existProductInChart.product.price,
        },
      });
      const updateQuantity = await prisma.chartProduct.update({
        where: {
          id: existProductInChart.id,
          chartId: activeChart.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return updateChart;
    }

    const newProductInChart = await prisma.chartProduct.create({
      data: {
        chartId: activeChart.id,
        productId: productId,
        quantity: quantity,
      },
      include: {
        product: true,
      },
    });

    const updateChartForNewProduct = await prisma.chart.update({
      where: { id: activeChart.id, userId },
      data: {
        totalPayment:
          activeChart.totalPayment + newProductInChart.product.price,
        orderAmount: activeChart.orderAmount + newProductInChart.product.price,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return updateChartForNewProduct;
  } catch (error) {
    throw error;
  }
};
const delteAddProduct = async (idProduct: number, idUser: string) => {
  const chart = await prisma.chart.findFirst({
    where: { userId: idUser },
    include: {
      products: true,
    },
  });
  if (!chart) {
    throw new Error(`chart not found`);
  }

  const chartProduct = await prisma.chartProduct.findUnique({
    where: {
      chartId_productId: {
        chartId: chart.id,
        productId: idProduct,
      },
    },
  });

  if (!chartProduct) {
    throw new Error(`prduct not found`);
  }

  const product = await prisma.chartProduct.delete({
    where: {
      chartId_productId: {
        chartId: chart.id,
        productId: idProduct,
      },
    },
  });

  return product;
};

export { create, deleteP, getAll, getById, addProduct, delteAddProduct };
