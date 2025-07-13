import { dbConfig } from "../config/database/db.config";
import Branch from "../entities/branch.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Branch>(
  dbConfig.getRepository(Branch),
  "branch_id",
  "is_deleted"
);
const branchRepository = {
  ...base,
};

export default branchRepository;
