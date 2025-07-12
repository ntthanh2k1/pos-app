import { Handler, NextFunction, Request, Response } from "express";

const createItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = createItem.name;
    next(error);
  }
};

const getItems: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getItems.name;
    next(error);
  }
};

const getItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getItem.name;
    next(error);
  }
};

const updateItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateItem.name;
    next(error);
  }
};

const softDeleteItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = softDeleteItem.name;
    next(error);
  }
};

export { createItem, getItems, getItem, updateItem, softDeleteItem };
