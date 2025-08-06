import { dbConfig } from "../config/database/db.config";
import Item from "../entities/item.entity";
import FilterData from "../shared/interfaces/filter-data.interface";
import baseRepository from "./base.repository";

const base = baseRepository<Item>(dbConfig.getRepository(Item), "item_id");
const itemRepository = {
  ...base,

  getItems: async (filterData: FilterData<Item>) => {
    return await base.getAll(filterData, (qb) =>
      qb
        .leftJoin(
          "entity.category_item",
          "category_item",
          "category_item.is_deleted = false"
        )
        .leftJoin("entity.unit", "unit", "unit.is_deleted = false")
        .addSelect([
          "category_item.category_item_id",
          "category_item.code",
          "category_item.name",

          "unit.unit_id",
          "unit.code",
          "unit.name",
        ])
    );
  },

  getItem: async (condition: Partial<Item>) => {
    return await base.getOneBy(condition, (qb) =>
      qb
        .leftJoin(
          "entity.category_item",
          "category_item",
          "category_item.is_deleted = false"
        )
        .leftJoin("entity.unit", "unit", "unit.is_deleted = false")
        .addSelect([
          "category_item.category_item_id",
          "category_item.code",
          "category_item.name",
          "unit.unit_id",
          "unit.code",
          "unit.name",
        ])
    );
  },
};

export default itemRepository;
