import { NextFunction, Request, Response } from "express";
import CustomError from "../shared/utils/custom-error";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.methodName
      ? `Error in ${err.methodName} module: ${err.message}`
      : err.message,
  });
};

export default errorHandler;
