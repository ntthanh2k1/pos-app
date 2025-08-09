import { Handler, NextFunction, Request, Response } from "express";
import userService from "./user.service";
import GetUsersDto from "./dtos/get-users.dto";

const createUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const dto = req.body;
    const authUser = req["user"];
    const result = await userService.createUser(dto, authUser);

    res.status(201).json(result);
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
    const dto = req.query as any;
    const result = await userService.getUsers(dto);

    res.status(200).json(result);
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
    const { id } = req.params;
    const result = await userService.getUser(id);

    res.status(200).json(result);
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
    const { id } = req.params;
    const dto = req.body;
    const authUser = req["user"];
    const result = await userService.updateUser(id, dto, authUser);

    res.status(200).json(result);
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
    const { id } = req.params;
    const authUser = req["user"];
    const result = await userService.deleteUser(id, authUser);

    res.status(200).json(result);
  } catch (error) {
    error.methodName = deleteUser.name;
    next(error);
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
