import {Request,Response} from "express";
import {createReview} from "./service.js";

interface CustomRequest extends Request {
    user?:{
        id: string;
        role?: 'ADMIN' | 'USER';
    }
}
const createReviewController =async (req:CustomRequest, res:Response):Promise<any> => {

   const {productId}=req.body;

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

   const {id}=req.user;
   try {

   const review=await createReview(id,productId);

    return res.status(201).json({
        status: "created success",
        review,
    })
   }catch(err:any){
       return  res.status(500).json({
           message: "Internal server error while creating review",
           error: err.message,
       });
   }

}


export {createReviewController}


