import { roleUserIs, updateUser } from "./service.js";
import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { User } from "@prisma/client";
import prisma from "../../config/db.js";

const roleUserIsController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await roleUserIs(userId);
    return res.status(200).json({ ...user });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

async function updateUserController(
  req: Request,
  res: Response,
): Promise<User | any> {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { FirstName, LastName, phoneNumber } = req.body;
    const updatedUser = await updateUser(userId, {
      FirstName,
      LastName,
      phoneNumber,
    });

    if (updatedUser) {
      await clerkClient.users.updateUser(userId, {
        firstName: FirstName,
        lastName: LastName,
      });

      return res.status(200).json({ ...updatedUser });
    }
    res.status(404).json({ error: "User not updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProfileImageController(
  req: Request,
  res: Response,
): Promise<any> {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const blob = new Blob([new Uint8Array(req.file.buffer)], {
      type: req.file.mimetype,
    });

    const updatedUser = await clerkClient.users.updateUserProfileImage(userId, {
      file: blob,
    });
    const imageUrl = updatedUser.imageUrl;
    await prisma.user.update({
      where: { Clerkid: userId },
      data: { imageUrl },
    });
    return res.status(200).json({ message: "Profile image updated", imageUrl });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export {
  roleUserIsController,
  updateUserController,
  updateProfileImageController,
};
