import { dbConfig } from "../config/database/db.config";
import Item from "../entities/item.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Item>(
  dbConfig.getRepository(Item),
  "item_id",
  "is_deleted"
);
const itemRepository = {
  ...base,
};

export default itemRepository;
