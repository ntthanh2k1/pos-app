import { dbConfig } from "../config/database/db.config";
import CategoryItem from "../entities/category-item.entity";
import FilterData from "../shared/interfaces/filter-data.interface";
import baseRepository from "./base.repository";

const base = baseRepository<CategoryItem>(
  dbConfig.getRepository(CategoryItem),
  "category_item_id",
  "is_deleted"
);
const categoryItemRepository = {
  ...base,

  getCategoryItems: async (filterData: FilterData<CategoryItem>) => {
    return await base.getAll(filterData, (qb) =>
      qb
        .leftJoin("entity.parent", "parent")
        .addSelect(["parent.category_item_id", "parent.code", "parent.name"])
    );
  },

  getCategoryItem: async (condition: Partial<CategoryItem>) => {
    return await base.getOneBy(condition, (qb) =>
      qb
        .leftJoin("entity.parent", "parent")
        .addSelect(["parent.category_item_id", "parent.code", "parent.name"])
    );
  },
};

export default categoryItemRepository;
