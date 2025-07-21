import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import inventoryRepository from "../../repositories/inventory.repository";

const createInventory: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { businessId, name, note } = req.body;
    const code = createCode("IY");
    const newInventory = await inventoryRepository.create({
      business_id: businessId,
      code,
      name,
      note,
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
    const {
      page,
      limit,
      search,
      searchColumns,
      businessId,
      branchId,
      isActive,
      orderBy,
      orderDir,
    } = req.query;
    const filters: Record<string, any> = {};

    if (businessId) {
      filters.business_id = businessId;
    }

    if (branchId) {
      filters.branch_id = branchId;
    }

    if (typeof isActive === "boolean") {
      filters.is_active = isActive;
    }

    const filterData: any = {
      page,
      limit,
      search: search ?? null,
      searchColumns:
        Array.isArray(searchColumns) && searchColumns.length > 0
          ? searchColumns
          : null,
      filters: Object.keys(filters).length > 0 ? filters : null,
      orderBy: orderBy ?? null,
      orderDir: orderDir ?? null,
    };
    const inventories = await inventoryRepository.getInventories(filterData);

    res.status(200).json({ success: true, ...inventories });
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
    const { id } = req.params;
    const currentInventory = await inventoryRepository.getOneBy({
      inventory_id: id,
    });

    if (!currentInventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found." });
    }

    res.status(200).json({ success: true, data: currentInventory });
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
    const { id } = req.params;
    const { name, note } = req.body;
    const currentInventory = await inventoryRepository.update(id, {
      name,
      note,
      updated_by: req["user"].username,
    });

    if (!currentInventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found." });
    }

    res.status(200).json({
      success: true,
      message: "Update inventory successfully.",
      data: currentInventory,
    });
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
    const { id } = req.params;

    await inventoryRepository.delete(id);

    res.status(200).json({
      success: true,
      message: "Delete inventory successfully.",
    });
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
