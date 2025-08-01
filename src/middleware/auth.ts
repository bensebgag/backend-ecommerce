import jwt  from "jsonwebtoken";
import {  Response, NextFunction } from "express";
import {customRequest} from "../util/types.js";

interface AuthPayload {
    id: string;
    role?: "ADMIN" | "USER";
}

export function authenticateToken(req: customRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) return res.sendStatus(403);

        if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
            req.user = decoded as AuthPayload;
            next();
        } else {
            return res.status(401).json({ error: "Invalid token format" });
        }
    });
}
