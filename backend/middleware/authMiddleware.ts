import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel";

type tokenType = { userID: string };

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Req = req as JwtPayload;

    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        );
        const Decoded = decoded as tokenType;

        Req.user = await User.findById(Decoded.userID).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorised, token failed.");
      }
    } else {
      res.status(401);
      throw new Error("Not authorised, no token.");
    }
  }
);

const admin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const Req = req as JwtPayload;

    if (Req.user && Req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorised as admin");
    }
  }
);

export { protect, admin };
