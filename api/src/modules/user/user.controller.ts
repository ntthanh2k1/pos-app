import { Handler, NextFunction, Request, Response } from "express";

const createUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = createUser.name;
    next(error);
  }
};

const getUsers: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getUsers.name;
    next(error);
  }
};

const getUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getUser.name;
    next(error);
  }
};

const updateUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateUser.name;
    next(error);
  }
};

const deleteUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = deleteUser.name;
    next(error);
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
