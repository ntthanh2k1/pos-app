import { NextFunction, Request, Response } from "express";
import CustomError from "../shared/interfaces/custom-error.interface";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    message: `Error in ${err.methodName} module: ${err.message}`,
  });
};

export default errorHandler;
