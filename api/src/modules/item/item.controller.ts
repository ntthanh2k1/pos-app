import { Handler, NextFunction, Request, Response } from "express";
import itemRepository from "../../repositories/item.repository";
import createCode from "../../shared/utils/create-code";

const createItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { categoryItemId, unitId, name, image, cost, note } = req.body;
    const code = createCode("IM");
    const newItem = await itemRepository.create({
      category_item_id: categoryItemId,
      unit_id: unitId,
      code,
      name,
      image,
      cost,
      note,
      created_by: req["user"].userId,
    });

    res.status(201).json({
      message: "Create item successfully.",
      data: newItem,
    });
  } catch (error) {
    error.methodName = createItem.name;
    next(error);
  }
};

const getItems: Handler = async (
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
      categoryItemId,
      unitId,
      isActive,
      orderBy,
      orderDir,
    } = req.query;
    const filters: Record<string, any> = {};

    if (categoryItemId) {
      filters.category_item_id = categoryItemId;
    }

    if (unitId) {
      filters.unit_id = unitId;
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
    const items = await itemRepository.getItems(filterData);

    res.status(200).json({
      ...items,
    });
  } catch (error) {
    error.methodName = getItems.name;
    next(error);
  }
};

const getItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentItem = await itemRepository.getItem({
      item_id: id,
    });

    if (!currentItem) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    res.status(200).json({
      data: currentItem,
    });
  } catch (error) {
    error.methodName = getItem.name;
    next(error);
  }
};

const updateItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const { categoryItemId, unitId, name, image, cost, note, isActive } =
      req.body;
    const currentItem = await itemRepository.update(id, {
      category_item_id: categoryItemId,
      unit_id: unitId,
      name,
      image,
      cost,
      note,
      is_active: isActive,
      updated_by: req["user"].userId,
    });

    if (!currentItem) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    res.status(200).json({
      message: "Update item successfully.",
      data: currentItem,
    });
  } catch (error) {
    error.methodName = updateItem.name;
    next(error);
  }
};

const deleteItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    await itemRepository.delete(id);

    res.status(200).json({
      message: "Delete item successfully.",
    });
  } catch (error) {
    error.methodName = deleteItem.name;
    next(error);
  }
};

export { createItem, getItems, getItem, updateItem, deleteItem };
