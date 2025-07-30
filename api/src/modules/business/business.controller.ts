import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import businessRepository from "../../repositories/business.repository";
import branchRepository from "../../repositories/branch.repository";
import inventoryRepository from "../../repositories/inventory.repository";
import userRepository from "../../repositories/user.repository";
import { hashPassword } from "../../shared/utils/password";
import branchUserRepository from "../../repositories/branch-user.repository";
import branchInventoryRepository from "../../repositories/branch-inventory.repository";

const createBusiness: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, image, phone, email, taxNumber, address, note, user } =
      req.body;

    // create business
    const code = createCode("BS");
    const newBusiness = await businessRepository.create({
      code,
      name,
      image,
      phone,
      email,
      tax_number: taxNumber,
      address,
      note,
    });

    // create branch
    const branchCode = createCode("BH");
    const newBranch = await branchRepository.create({
      business_id: newBusiness.business_id,
      code: branchCode,
      name,
      phone,
      email,
      tax_number: taxNumber,
      address,
      note,
    });

    // create inventory
    const inventoryCode = createCode("IY");
    const newInventory = await inventoryRepository.create({
      business_id: newBusiness.business_id,
      code: inventoryCode,
      name: `${name}'s Main Inventory`,
      is_main_inventory: true,
    });

    // create user
    const currentUser = await userRepository.getOneBy({
      username: user.username,
    });

    if (currentUser) {
      return res.status(400).json({
        message: `User ${user.username} already exists.`,
      });
    }

    if (user.password !== user.confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match.",
      });
    }

    const userCode = createCode("UR");
    const hashedPassword = await hashPassword(user.password);
    const newUser = await userRepository.create({
      business_id: newBusiness.business_id,
      code: userCode,
      name: user.name,
      username: user.username,
      password: hashedPassword,
    });

    // create branch-inventory
    await branchInventoryRepository.create({
      branch_id: newBranch.branch_id,
      inventory_id: newInventory.inventory_id,
      business_id: newBusiness.business_id,
    });

    // create branch-user
    await branchUserRepository.create({
      branch_id: newBranch.branch_id,
      user_id: newUser.user_id,
    });

    res.status(201).json({
      message: "Create business successfully.",
      data: newBusiness,
    });
  } catch (error) {
    error.methodName = createBusiness.name;
    next(error);
  }
};

const getBusiness: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getBusiness.name;
    next(error);
  }
};

const updateBusiness: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateBusiness.name;
    next(error);
  }
};

const deleteBusiness: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = deleteBusiness.name;
    next(error);
  }
};

export { createBusiness, getBusiness, updateBusiness, deleteBusiness };
