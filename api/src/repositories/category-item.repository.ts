import { dbConfig } from "../config/database/db.config";
import CategoryItem from "../entities/category-item.entity";
import baseRepository from "./base.repository";

const base = baseRepository<CategoryItem>(
  dbConfig.getRepository(CategoryItem),
  "category_item_id",
  "is_deleted"
);
const categoryItemRepository = {
  ...base,
};

export default categoryItemRepository;
