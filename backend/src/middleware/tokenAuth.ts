// middleware/tokenAuth.ts
import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
  // Add your token validation logic here, for example:
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  jwt.verify(
    token,
    process.env.jwt_secret || "defaultSecret",
    async (err, decoded) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      const { id } = decoded as any;
      let auth_user = await User.findOne({
        where: { id: id },
      });
      if (!auth_user) {
        return res
          .status(400)
          .json({ msg: "Please re login session not found!" });
      }
      next();
    }
  );
};

export default tokenAuth;
