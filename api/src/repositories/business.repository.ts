import { dbConfig } from "../config/database/db.config";
import Business from "../entities/business.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Business>(
  dbConfig.getRepository(Business),
  "business_id"
);
const businessRepository = {
  ...base,
};

export default businessRepository;
