import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import categoryItemRepository from "../../repositories/category-item.repository";

const createCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { parent_id, name, note } = req.body;
    const code = createCode("CIM");

    const newCategoryItem = await categoryItemRepository.create({
      parent_id,
      code,
      name,
      note,
      created_by: req["user"].username,
    });

    res.status(201).json({ success: true, data: newCategoryItem });
  } catch (error) {
    error.methodName = createCategoryItem.name;
    next(error);
  }
};

const getAllCategoryItems: Handler = async (
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
      parent_id,
      is_active,
      orderBy,
      orderDir,
    } = req.query;

    const filters: Record<string, any> = {};

    if (parent_id) {
      filters.parent_id = parent_id;
    }

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

    const categoryItems = await categoryItemRepository.getAll(
      filterData,
      (qb) =>
        qb
          .leftJoin("entity.parent", "parent")
          .addSelect(["parent.category_item_id", "parent.code", "parent.name"])
    );

    res.status(200).json({ success: true, ...categoryItems });
  } catch (error) {
    error.methodName = getAllCategoryItems.name;
    next(error);
  }
};

const getCategoryItemById: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = getCategoryItemById.name;
    next(error);
  }
};

const updateCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = updateCategoryItem.name;
    next(error);
  }
};

const softDeleteCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
  } catch (error) {
    error.methodName = softDeleteCategoryItem.name;
    next(error);
  }
};

export {
  createCategoryItem,
  getAllCategoryItems,
  getCategoryItemById,
  updateCategoryItem,
  softDeleteCategoryItem,
};
