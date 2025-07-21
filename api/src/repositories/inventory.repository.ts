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
    // const { filters, ...rest } = filterData;
    // const updateFilters: Record<string, any> = {};

    // if (filters?.businessId) {
    //   updateFilters["business.business_id"] = filters.businessId;
    //   delete filters.businessId;
    // }

    // if (filters?.branchId) {
    //   updateFilters["branch.branch_id"] = filters.branchId;
    //   delete filters.branchId;
    // }

    // Object.assign(updateFilters, filters);

    return await base.getAll(filterData, (qb) =>
      qb
        .leftJoin("entity.business", "business")
        .leftJoin("entity.branch", "branch")
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
