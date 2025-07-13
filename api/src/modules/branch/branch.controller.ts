import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import branchRepository from "../../repositories/branch.repository";

const createBranch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, phone, email, taxNumber, address, note } = req.body;
    const code = createCode("BH");
    const newBranch = await branchRepository.create({
      code,
      name,
      phone,
      email,
      tax_number: taxNumber,
      address,
      note,
      created_by: req["user"].username,
    });

    res.status(201).json({
      success: true,
      message: "Create branch successfully.",
      data: newBranch,
    });
  } catch (error) {
    error.methodName = createBranch.name;
    next(error);
  }
};

const getBranches: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { page, limit, search, searchColumns, isActive, orderBy, orderDir } =
      req.query;
    const filters: Record<string, any> = {};

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
    const branches = await branchRepository.getAll(filterData);

    res.status(200).json({ success: true, ...branches });
  } catch (error) {
    error.methodName = getBranches.name;
    next(error);
  }
};

const getBranch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentBranch = await branchRepository.getOneBy({
      branch_id: id,
    });

    if (!currentBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found." });
    }

    res.status(200).json({ success: true, data: currentBranch });
  } catch (error) {
    error.methodName = getBranch.name;
    next(error);
  }
};

const updateBranch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, phone, email, taxNumber, address, note } = req.body;
    const currentBranch = await branchRepository.update(id, {
      name,
      phone,
      email,
      tax_number: taxNumber,
      address,
      note,
      updated_by: req["user"].username,
    });

    if (!currentBranch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found." });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Update branch successfully.",
        data: currentBranch,
      });
  } catch (error) {
    error.methodName = updateBranch.name;
    next(error);
  }
};

const deleteBranch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    await branchRepository.delete(id);

    res
      .status(200)
      .json({ success: true, message: "Delete branch successfully." });
  } catch (error) {
    error.methodName = deleteBranch.name;
    next(error);
  }
};

export { createBranch, getBranches, getBranch, updateBranch, deleteBranch };
