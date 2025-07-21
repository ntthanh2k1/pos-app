import { dbConfig } from "../config/database/db.config";
import InventoryItem from "../entities/inventory-item.entity";
import baseRepository from "./base.repository";

const base = baseRepository<InventoryItem>(
  dbConfig.getRepository(InventoryItem),
  "inventory_item_id"
);
const inventoryItemRepository = {
  ...base,
};

export default inventoryItemRepository;
