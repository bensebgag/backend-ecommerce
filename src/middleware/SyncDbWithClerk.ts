import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import prisma from "../config/db.js";

export async function SyncDataUserWithClerk(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;
    const sessionClaims =
      "sessionClaims" in auth ? (auth as any).sessionClaims : undefined;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { Clerkid: userId },
      });
      if (!user) {
        await prisma.user.create({
          data: {
            Clerkid: userId,
            FirstName: sessionClaims?.FirstName ?? undefined,
            LastName: sessionClaims?.LastName ?? undefined,
            phoneNumber: sessionClaims?.phoneNumber ?? undefined,
            email: sessionClaims?.email ?? undefined,
          },
        });
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
