import { createBill, AllBill } from "./repository.js";

const createNewBill = async (
  userId: string,
  Invoice: string,
  chartId: number
) => {
  return await createBill(userId, Invoice, chartId);
};
const getAllBill = async (userId: string) => {
  return await AllBill(userId);
};
export { createNewBill, getAllBill };
