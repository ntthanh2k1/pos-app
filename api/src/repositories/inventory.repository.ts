import { dbConfig } from "../config/database/db.config";
import Inventory from "../entities/inventory.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Inventory>(
  dbConfig.getRepository(Inventory),
  "inventory_id",
  "is_deleted"
);
const inventoryRepository = {
  ...base,
};

export default inventoryRepository;
