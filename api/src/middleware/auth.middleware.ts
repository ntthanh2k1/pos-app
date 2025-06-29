import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../shared/utils/jwt";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken = null;

    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies["access_token"]) {
      accessToken = req.cookies["access_token"];
    }

    if (!accessToken) {
      res.status(401).json({
        success: false,
        message: "Access token not provided.",
      });
      return;
    }

    const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req["user"] = decoded;
    next();
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res.status(401).json({
        sucess: false,
        message: "Access token invalid/expired.",
      });
      return;
    }

    error.methodName = authorize.name;
    next(error);
  }
};

export default authorize;
