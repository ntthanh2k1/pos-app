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
      business_id: req["user"].businessId,
      branch_id: req["user"].branchId,
      code,
      name,
      note,
      created_by: req["user"].userId,
    });

    res.status(201).json({
      message: "Create category item successfully.",
      data: newCategoryItem,
    });
  } catch (error) {
    error.methodName = createCategoryItem.name;
    next(error);
  }
};

const getCategoryItems: Handler = async (
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
      parentId,
      businessId,
      branchId,
      isActive,
      orderBy,
      orderDir,
    } = req.query;
    const filters: Record<string, any> = {};

    if (parentId) {
      filters.parent_id = parentId;
    }

    if (businessId) {
      filters.business_id = businessId;
    }

    if (branchId) {
      filters.branch_id = branchId;
    }

    if (typeof isActive === "string") {
      filters.is_active = isActive === "true";
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
    const categoryItems = await categoryItemRepository.getCategoryItems(
      filterData
    );

    res.status(200).json({
      ...categoryItems,
    });
  } catch (error) {
    error.methodName = getCategoryItems.name;
    next(error);
  }
};

const getCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentCategoryItem = await categoryItemRepository.getCategoryItem({
      category_item_id: id,
    });

    if (!currentCategoryItem) {
      return res.status(404).json({
        message: "Category item not found.",
      });
    }

    res.status(200).json({
      data: currentCategoryItem,
    });
  } catch (error) {
    error.methodName = getCategoryItem.name;
    next(error);
  }
};

const updateCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { parentId, name, note, isActive } = req.body;
    const currentCategoryItem = await categoryItemRepository.update(id, {
      parent_id: parentId,
      name,
      note,
      is_active: isActive,
      updated_by: req["user"].userId,
    });

    if (!currentCategoryItem) {
      return res.status(404).json({
        message: "Category item not found.",
      });
    }

    res.status(200).json({
      message: "Update category item successfully.",
      data: currentCategoryItem,
    });
  } catch (error) {
    error.methodName = updateCategoryItem.name;
    next(error);
  }
};

const deleteCategoryItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    await categoryItemRepository.delete(id);

    res.status(200).json({
      message: "Delete category item successfully.",
    });
  } catch (error) {
    error.methodName = deleteCategoryItem.name;
    next(error);
  }
};

export {
  createCategoryItem,
  getCategoryItems,
  getCategoryItem,
  updateCategoryItem,
  deleteCategoryItem,
};
