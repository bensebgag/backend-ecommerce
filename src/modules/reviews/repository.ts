import prisma from "../../config/db.js";


const create =async (idUser:string,idProduct:number) => {


    const existingReview = await prisma.review.findFirst({
        where: {
            userId: idUser,
            productId: idProduct
        }
    });


    if (!existingReview) {
        return await prisma.review.create({
            data: {
                userId: idUser,
                productId: idProduct,
                like: 1
            }
        });
    }

    return existingReview;

}
export {create}