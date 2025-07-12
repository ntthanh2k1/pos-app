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

  getAllCategoryItems: async (filterData: FilterData<CategoryItem>) => {
    const categoryItems = await base.getAll(filterData, (qb) =>
      qb
        .leftJoin("entity.parent", "parent")
        .addSelect(["parent.category_item_id", "parent.code", "parent.name"])
    );
    return categoryItems;
  },
};

export default categoryItemRepository;
