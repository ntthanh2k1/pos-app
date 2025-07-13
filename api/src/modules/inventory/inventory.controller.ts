import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import inventoryRepository from "../../repositories/inventory.repository";
import branchInventoryRepository from "../../repositories/branch-inventory.repository";
import branchRepository from "../../repositories/branch.repository";

const createInventory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { branchId, name, note } = req.body;
    const code = createCode("IY");
    const newInventory = await inventoryRepository.create({
      code,
      name,
      note,
      created_by: req["user"].username,
    });
    const currentBranch = await branchRepository.getOneBy({
      branch_id: branchId,
    });

    await branchInventoryRepository.create({
      branch_id: branchId,
      inventory_id: newInventory.inventory_id,
      branch_code: currentBranch.code,
      branch_name: currentBranch.name,
      inventory_code: newInventory.code,
      inventory_name: newInventory.name,
      created_by: req["user"].username,
    });

    res.status(201).json({
      success: true,
      message: "Create inventory successfully.",
      data: newInventory,
    });
  } catch (error) {
    error.methodName = createInventory.name;
    next(error);
  }
};

const getInventories: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getInventories.name;
    next(error);
  }
};

const getInventory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getInventory.name;
    next(error);
  }
};

const updateInventory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateInventory.name;
    next(error);
  }
};

const deleteInventory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = deleteInventory.name;
    next(error);
  }
};

export {
  createInventory,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
};
