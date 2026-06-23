import { addProduct, create, deleteP, delteAddProduct, getAll, getById, } from "./repository.js";
const createProduct = async (name, price, description, quantity, categoryName, sizeValues, typesChoose = {}) => {
    return create(name, price, description, quantity, categoryName, sizeValues, typesChoose);
};
const deleteProduct = async (id) => {
    return deleteP(id);
};
const getAllProducts = async (id) => {
    return await getAll(id);
};
const getProductById = async (id) => {
    return await getById(id);
};
const addPoductToChart = async (userId, productId, size, image) => {
    return addProduct(userId, productId, size, image);
};
const deleteFromChart = async (idProduct, idUser) => {
    return delteAddProduct(idProduct, idUser);
};
export { createProduct, deleteProduct, getAllProducts, getProductById, addPoductToChart, deleteFromChart, };
