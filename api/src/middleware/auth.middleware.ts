import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../shared/utils/token";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import TokenPayload from "../shared/interfaces/token-payload.interface";

const authorize =
  (requireBranch = true) =>
  async (req: Request, res: Response, next: NextFunction) => {
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

      const decoded = verifyToken(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      ) as TokenPayload;

      req["user"] = decoded;

      if (requireBranch && !decoded.branchId) {
        res.status(401).json({
          success: false,
          message: "Branch not found.",
        });
        return;
      }

      next();
    } catch (error: any) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        res.status(401).json({
          sucess: false,
          message: "Access token not valid.",
        });
        return;
      }

      error.methodName = authorize.name;
      next(error);
    }
  };

export default authorize;
