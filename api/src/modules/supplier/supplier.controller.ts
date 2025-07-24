import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import supplierRepository from "../../repositories/supplier.repository";

const createSupplier: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { businessId, name, phone, email, tax_number, address, note } =
      req.body;
    const code = createCode("SR");
    const newSupplier = await supplierRepository.create({
      business_id: businessId,
      code,
      name,
      phone,
      email,
      tax_number,
      address,
      note,
      created_by: req["user"].userId,
    });

    res.status(201).json({
      success: true,
      message: "Create supplier successfully.",
      data: newSupplier,
    });
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
    const {
      page,
      limit,
      search,
      searchColumns,
      businessId,
      isActive,
      orderBy,
      orderDir,
    } = req.query;
    const filters: Record<string, any> = {};

    if (businessId) {
      filters.business_id = businessId;
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
      orderby: orderBy ?? null,
      orderDir: orderDir ?? null,
    };
    const suppliers = await supplierRepository.getAll(filterData);

    res.status(200).json({ success: true, ...suppliers });
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
    const { id } = req.params;
    const currentSupplier = await supplierRepository.getOneBy({
      supplier_id: id,
    });

    if (!currentSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier not found." });
    }

    res.status(200).json({ success: true, data: currentSupplier });
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
    const { id } = req.params;
    const { name, phone, email, tax_number, address, note, isActive } =
      req.body;
    const currentSupplier = await supplierRepository.update(id, {
      name,
      phone,
      email,
      tax_number,
      address,
      note,
      is_active: isActive,
      updated_by: req["user"].userId,
    });

    if (!currentSupplier) {
      return res
        .status(400)
        .json({ success: false, message: "Supplier not found." });
    }

    res.status(200).json({
      success: true,
      message: "Update supplier successfully.",
      data: currentSupplier,
    });
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
    const { id } = req.params;

    await supplierRepository.delete(id);

    res
      .status(200)
      .json({ success: true, message: "Delete supplier successfully." });
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
