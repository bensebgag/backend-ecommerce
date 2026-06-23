import { createUserController, roleUserIsController } from "./controller.js";
import express from "express";

const router = express.Router();

router.post("/createNewUser", createUserController);
router.get("/roleUser", roleUserIsController);

export default router;
