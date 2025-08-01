import {createUserController, roleUserIsController} from "./controller.js";
import express from "express";
import {ClerkExpressWithAuth} from "@clerk/clerk-sdk-node";

const router = express.Router();

router.post("/createNewUser", createUserController);
router.get("/roleUser",ClerkExpressWithAuth(),roleUserIsController);


export default router;


