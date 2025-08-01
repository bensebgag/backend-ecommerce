import {add, getAll} from "./repository.js";


const getAllCategory=async ()=>{
    return await getAll();
}
const createCategory=async(CategoryName:string)=>{
   return await add(CategoryName);
}

export {getAllCategory,createCategory}