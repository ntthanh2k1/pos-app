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

const getAllUsers: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getAllUsers.name;
    next(error);
  }
};

const getUserById: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getUserById.name;
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  softDeleteUser,
};
