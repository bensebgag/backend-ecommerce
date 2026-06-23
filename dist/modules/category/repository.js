import prisma from "../../config/db.js";
const getAll = async () => {
    return prisma.category.findMany();
};
const add = async (nameCateogry) => {
    return prisma.category.create({ data: {
            name: nameCateogry
        } });
};
export { getAll, add };
