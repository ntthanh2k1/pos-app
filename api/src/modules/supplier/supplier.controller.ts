import { Handler, NextFunction, Request, Response } from "express";

const createSupplier: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = createSupplier.name;
    next(error);
  }
};

const getSuppliers: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getSuppliers.name;
    next(error);
  }
};

const getSupplier: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getSupplier.name;
    next(error);
  }
};

const updateSupplier: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateSupplier.name;
    next(error);
  }
};

const deleteSupplier: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = deleteSupplier.name;
    next(error);
  }
};

export {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
