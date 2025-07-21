import { Handler, NextFunction, Request, Response } from "express";

const createBusiness: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = createBusiness.name;
    next(error);
  }
};
