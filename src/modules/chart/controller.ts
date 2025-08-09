import { Response, Request } from "express";
import {
  createChart,
  delteProductFromChart,
  getChart,
  syncQuantity,
} from "./service.js";
import { getAuth } from "@clerk/express";

const createChartController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { orderAmount, discount, totalPayment, billId, products } = req.body;

    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Chart must contain at least one product",
      });
    }

    const newChart = await createChart({
      userId,
      orderAmount,
      discount,
      totalPayment,
      billId,
      products,
    });

    return res.status(201).json({
      success: true,
      data: newChart,
      message: "Chart created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error creating chart",
    });
  }
};

const getChartController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
    }
    const host = `${req.protocol}://${req.get("host")}`;
    const chart = await getChart(userId);

    if (!chart || !chart.products) {
      return res.status(200).json(chart);
    }

    const transformedChart = {
      ...chart,
      products: chart.products.map((item) => ({
        ...item,
        product: {
          ...item.product,
          typesChoose: (item.product.typesChoose as string[]).map((filename) =>
            filename ? `${host}/images/${filename}` : null
          ),
        },
      })),
    };

    return res.status(200).json(transformedChart);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error creating chart",
    });
  }
};

const deleteProductFromChartController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const idProduct = req.params.idProduct;
    const { chartId } = req.query;
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
    }

    if (!idProduct || !chartId) {
      return res.status(400).json({
        success: false,
        message: "Provide an valid id ",
      });
    }

    const chartProduct = await delteProductFromChart(
      userId,
      +chartId,
      +idProduct
    );

    return res.status(200).json({
      chartProduct,
      message: "deleted product from chart successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error creating chart",
    });
  }
};

const syncQuantityController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { chartProductId } = req.params;
    const { quantity, opreationType } = req.body;
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not authenticated.",
      });
    }

    if (!chartProductId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid chart product ID and quantity",
      });
    }

    const updatedChart = await syncQuantity(
      +chartProductId,
      +quantity,
      opreationType,
      userId
    );

    return res.status(200).json({
      data: updatedChart,
      message: "Quantity updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error updating quantity",
    });
  }
};

export {
  createChartController,
  getChartController,
  deleteProductFromChartController,
  syncQuantityController,
};
