import {creteUser, roleUserIs} from "./service.js";
import { Request, Response } from "express";
import {getAuth} from "@clerk/express";


const createUserController =async (req: Request, res: Response):Promise<any> => {
  const {name,Clerkid } = req.body;
    if (!name) {
        res.status(400).json({ message: "Name are required." });
    }

    if (!Clerkid){
        res.status(400).json({ message: " login required" });
    }

    try {
        const newUser = await creteUser(name,Clerkid);
       return  res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error: any) {
       return  res.status(500).json({
            message: "Internal server error while creating user",
            error: error.message,
        });
    }
}

const roleUserIsController =async (req: Request, res: Response):Promise<any> => {
  try{
      const { userId } = getAuth(req)

      if (!userId) {
          return res.status(401).json({ error: "User not authenticated" });
      }

     const user=await roleUserIs(userId)
      return res.status(200).json({...user});
  }  catch(err){
      res.status(500).json({error: "Internal server error"});
  }
}

 export {createUserController , roleUserIsController};