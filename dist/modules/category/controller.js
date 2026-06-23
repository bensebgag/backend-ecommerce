import { createCategory, getAllCategory } from "./service.js";
const getAllCategoriesController = async (req, res) => {
    try {
        const catogr = await getAllCategory();
        return res.status(200).send(catogr);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
const createCategoryController = async (req, res) => {
    const { categoryName } = req.body;
    if (!categoryName) {
        return res.status(500).send({ message: "Category name required" });
    }
    try {
        const newCategory = await createCategory(categoryName);
        return res.status(201).send(newCategory);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
export { getAllCategoriesController, createCategoryController };
