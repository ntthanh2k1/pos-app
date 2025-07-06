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
    const unitCode = createCode("UNIT");

    const newUnit = await unitRepository.create({
      code: unitCode,
      name,
      symbol,
      note,
    });

    res.status(201).json({ success: true, data: newUnit });
  } catch (error) {
    error.methodName = createUnit.name;
    next(error);
  }
};

const getAllUnits: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, search, searchColumns, is_active, orderBy, orderDir } =
      req.query;

    const filters: Record<string, any> = {};

    if (typeof is_active === "boolean") {
      filters.is_active = is_active;
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
    res.status(200).json({ success: true, data: units });
  } catch (error) {
    error.methodName = getAllUnits.name;
    next(error);
  }
};

export { createUnit, getAllUnits };
