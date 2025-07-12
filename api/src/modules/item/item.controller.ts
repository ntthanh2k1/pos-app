import { Handler, NextFunction, Request, Response } from "express";
import itemRepository from "../../repositories/item.repository";
import createCode from "../../shared/utils/create-code";
import categoryItemRepository from "../../repositories/category-item.repository";
import unitRepository from "../../repositories/unit.repository";

const createItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { category_item_id, unit_id, name, image, cost, note } = req.body;
    const code = createCode("IM");
    const newItem = await itemRepository.create({
      category_item_id,
      unit_id,
      code,
      name,
      image,
      cost,
      note,
      created_by: req["user"].username,
    });

    res.status(201).json({
      success: true,
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
      category_item_id,
      unit_id,
      is_active,
      orderBy,
      orderDir,
    } = req.query;
    const filters: Record<string, any> = {};

    if (category_item_id) {
      filters.category_item_id = category_item_id;
    }

    if (unit_id) {
      filters.unit_id = unit_id;
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
    const items = await itemRepository.getItems(filterData);

    res.status(200).json({ success: true, ...items });
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
      return res
        .status(404)
        .json({ success: false, message: "Item not found." });
    }

    res.status(200).json({ success: true, data: currentItem });
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
    const { category_item_id, unit_id, name, image, cost, note, is_active } =
      req.body;
    const currentItem = await itemRepository.update(id, {
      category_item_id,
      unit_id,
      name,
      image,
      cost,
      note,
      is_active,
      updated_by: req["user"].username,
    });

    if (!currentItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found." });
    }

    res.status(200).json({
      success: true,
      message: "Update item successfully.",
      data: currentItem,
    });
  } catch (error) {
    error.methodName = updateItem.name;
    next(error);
  }
};

const softDeleteItem: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentItem = await itemRepository.softDelete(
      id,
      req["user"].username
    );

    if (!currentItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found." });
    }

    res.status(200).json({
      success: true,
      message: "Delete item successfully.",
      data: currentItem,
    });
  } catch (error) {
    error.methodName = softDeleteItem.name;
    next(error);
  }
};

export { createItem, getItems, getItem, updateItem, softDeleteItem };
