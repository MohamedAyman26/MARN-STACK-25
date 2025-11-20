import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface JwtPayload {
  _id: string;
  email: string;
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Bearer token missing" });

  try {
    const secret = process.env.JWT_SECRET || "fallbackSecret";
    const payload = jwt.verify(token, secret) as JwtPayload;

    const user = await userModel.findById(payload._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    (req as any).user = user;
    next();
  } catch (err: any) {
    return res.status(403).json({ error: err.message || "Invalid token" });
  }
};

export default validateJWT;
