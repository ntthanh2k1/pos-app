import { dbConfig } from "../config/database/db.config";
import Unit from "../entities/unit.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Unit>(
  dbConfig.getRepository(Unit),
  "unit_id",
  "is_deleted"
);
const unitRepository = {
  ...base,
};

export default unitRepository;
