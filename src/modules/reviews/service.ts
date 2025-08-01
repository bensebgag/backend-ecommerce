import {create} from "./repository.js";

const createReview=async (UserId:string,ProductId:number)=>{

    return create(UserId,ProductId);
}

export {createReview};