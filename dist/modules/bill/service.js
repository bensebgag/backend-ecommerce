import { createBill, AllBill } from "./repository.js";
const createNewBill = async (userId, Invoice, chartId) => {
    return await createBill(userId, Invoice, chartId);
};
const getAllBill = async (userId) => {
    return await AllBill(userId);
};
export { createNewBill, getAllBill };
