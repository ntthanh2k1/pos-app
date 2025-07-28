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

    if (filters?.branch_id) {
      updateFilters["branch_inventories.branch_id"] = filters.branch_id;
      delete filters.branch_id;
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
          .leftJoin("branch_inventories.branch", "branch")
          .leftJoin("entity.business", "business")
          .addSelect([
            "business.business_id",
            "business.code",
            "business.name",

            "branch.branch_id",
            "branch.code",
            "branch.name",
          ])
    );
  },
};

export default inventoryRepository;
