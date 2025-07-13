import { dbConfig } from "../config/database/db.config";
import Inventory from "../entities/inventory.entity";
import FilterData from "../shared/interfaces/filter-data.interface";
import baseRepository from "./base.repository";

const base = baseRepository<Inventory>(
  dbConfig.getRepository(Inventory),
  "inventory_id"
);
const inventoryRepository = {
  ...base,

  getInventories: async (filterData: FilterData<Inventory>) => {
    const { filters, ...rest } = filterData;
    const updateFilters: Record<string, any> = {};

    if (filters?.branchId) {
      updateFilters["branch_inventories.branch_id"] = filters.branchId;
      delete filters.branchId;
    }

    Object.assign(updateFilters, filters);

    return await base.getAll(
      {
        ...rest,
        filters: updateFilters,
      },
      (qb) =>
        qb
          .leftJoin("entity.branch_inventories", "branch_inventories")
          .addSelect([
            "branch_inventories.branch_inventory_id",
            "branch_inventories.branch_id",
            "branch_inventories.branch_code",
            "branch_inventories.branch_name",
            "branch_inventories.is_main_inventory",
          ])
    );
  },
};

export default inventoryRepository;
