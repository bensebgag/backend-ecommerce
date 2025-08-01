import prisma from "../../config/db.js";

const createBill = async (userId: string, invoice: string, chartId: number) => {
  try {
    const chart = await prisma.chart.findUnique({
      where: {
        id: chartId,
        userId: userId,
      },
    });

    if (!chart) {
      throw new Error(`chart with id ${chartId} not found`);
    }

    const newBill = await prisma.bill.create({
      data: {
        userId: userId,
        Invoice: invoice,
        chartId: chart.id,
      },
      include: {
        chart: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
            userowner: true,
          },
        },
      },
    });

    return newBill;
  } catch (err) {
    throw err;
  }
};

const AllBill = async (userId: string) => {
  try {
    const bills = await prisma.bill.findMany({
      where: {
        userId,
        
      },
      include: {
        chart: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    return bills;
  } catch (err) {
    throw err;
  }
};
export { createBill, AllBill };
