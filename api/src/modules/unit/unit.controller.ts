import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import unitRepository from "../../repositories/unit.repository";

const createUnit: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, symbol, note } = req.body;
    const unitCode = createCode("UT");
    const newUnit = await unitRepository.create({
      code: unitCode,
      name,
      symbol,
      note,
      created_by: req["user"].userId,
    });

    res.status(201).json({
      message: "Create unit successfully.",
      data: newUnit,
    });
  } catch (error) {
    error.methodName = createUnit.name;
    next(error);
  }
};

const getUnits: Handler = async (
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

    const units = await unitRepository.getAll(filterData);

    res.status(200).json({ ...units });
  } catch (error) {
    error.methodName = getUnits.name;
    next(error);
  }
};

const getUnit: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUnit = await unitRepository.getOneBy({ unit_id: id });

    if (!currentUnit) {
      return res.status(404).json({ message: "Unit not found." });
    }

    res.status(200).json({ data: currentUnit });
  } catch (error) {
    error.methodName = getUnit.name;
    next(error);
  }
};

const updateUnit: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, symbol, note, isActive } = req.body;
    const currentUnit = await unitRepository.update(id, {
      name,
      symbol,
      note,
      is_active: isActive,
      updated_by: req["user"].userId,
    });

    if (!currentUnit) {
      return res.status(404).json({ message: "Unit not found." });
    }

    res.status(200).json({
      message: "Update unit successfully.",
      data: currentUnit,
    });
  } catch (error) {
    error.methodName = updateUnit.name;
    next(error);
  }
};

const deleteUnit: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    await unitRepository.delete(id);

    res.status(200).json({
      message: "Delete unit successfully.",
    });
  } catch (error) {
    error.methodName = deleteUnit.name;
    next(error);
  }
};

export { createUnit, getUnits, getUnit, updateUnit, deleteUnit };
