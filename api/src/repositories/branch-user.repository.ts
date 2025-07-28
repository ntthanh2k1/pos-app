import { dbConfig } from "../config/database/db.config";
import BranchUser from "../entities/branch-user.entity";
import baseRepository from "./base.repository";

const base = baseRepository<BranchUser>(
  dbConfig.getRepository(BranchUser),
  "branch_user_id"
);
const branchUserRepository = {
  ...base,
};

export default branchUserRepository;
