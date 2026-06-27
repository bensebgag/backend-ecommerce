import multer from "multer";
import {
  roleUserIsController,
  updateProfileImageController,
  updateUserController,
} from "./controller.js";
import express from "express";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/roleUser", roleUserIsController);
router.put("/updateUser", updateUserController);
router.post(
  "/updateProfileImage",
  upload.single("file"),
  updateProfileImageController,
);
export default router;
