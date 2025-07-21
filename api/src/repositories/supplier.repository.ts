import { dbConfig } from "../config/database/db.config";
import Supplier from "../entities/supplier.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Supplier>(
  dbConfig.getRepository(Supplier),
  "supplier_id"
);
const supplierRepository = {
  ...base,
};

export default supplierRepository;
