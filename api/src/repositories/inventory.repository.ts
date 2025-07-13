import { dbConfig } from "../config/database/db.config";
import Inventory from "../entities/inventory.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Inventory>(
  dbConfig.getRepository(Inventory),
  "inventory_id"
);
const inventoryRepository = {
  ...base,
};

export default inventoryRepository;
