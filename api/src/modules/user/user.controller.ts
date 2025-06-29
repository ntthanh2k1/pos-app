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

const findAllUsers: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = findAllUsers.name;
    next(error);
  }
};

const findUserById: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = findUserById.name;
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

const softDeleteUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = softDeleteUser.name;
    next(error);
  }
};

export {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  softDeleteUser,
};
