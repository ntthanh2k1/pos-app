import { dbConfig } from "../config/database/db.config";
import BranchInventory from "../entities/branch-inventory.entity";
import baseRepository from "./base.repository";

const base = baseRepository<BranchInventory>(
  dbConfig.getRepository(BranchInventory),
  "branch_inventory_id",
  "is_deleted"
);
const branchInventoryRepository = {
  ...base,
};

export default branchInventoryRepository;
