import {addProduct, create, deleteP, delteAddProduct, getAll, getById} from "./repository.js";

const createProduct = async (name: string,
                             price: number,
                             description: string,
                             quantity: number,
                             categoryName: string,
                             sizeValues: number[],
                             typesChoose: Record<string, any> = {} )=> {

  return create(name, price, description, quantity, categoryName, sizeValues, typesChoose);

}

const deleteProduct = async (id:number)=>{
     return deleteP(id)
}

const getAllProducts = async(id:number) => {
     return await getAll(id);
}
const getProductById = async (id:number)=>{
    return await getById(id);
}

const addPoductToChart=async (userId:string,productId:number)=>{
  return addProduct(userId,productId);
}
const deleteFromChart=async (idProduct :number,idUser:string)=>{
    return delteAddProduct(idProduct,idUser);
}
export {createProduct,deleteProduct,getAllProducts,getProductById,addPoductToChart,deleteFromChart}