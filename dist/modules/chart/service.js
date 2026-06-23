import { create, getByUserId, delteProduct, syncQuantityWithChartProduct, } from "./repository.js";
const createChart = async (data) => {
    return create(data);
};
const getChart = async (id) => {
    return getByUserId(id);
};
const delteProductFromChart = async (idUser, idChart, idProduct) => {
    try {
        return delteProduct(idUser, idChart, idProduct);
    }
    catch (err) {
        throw err;
    }
};
const syncQuantity = async (productChartId, quantity, opreationType, userId) => {
    try {
        return syncQuantityWithChartProduct(productChartId, quantity, opreationType, userId);
    }
    catch (err) {
        throw err;
    }
};
export { createChart, getChart, delteProductFromChart, syncQuantity };
