import { CreateChartInput } from "../../util/types.js";
import { create, getByUserId, delteProduct } from "./repository.js";

const createChart = async (data: CreateChartInput) => {
  return create(data);
};
const getChart = async (id: string) => {
  return getByUserId(id);
};
const delteProductFromChart = async (
  idUser: string,
  idChart: number,
  idProduct: number
) => {
  try {
    return delteProduct(idUser, idChart, idProduct);
  } catch (err) {
    throw err;
  }
};
export { createChart, getChart, delteProductFromChart };
