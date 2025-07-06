import { dbConfig } from "../config/db.config";
import Unit from "../entities/unit.entity";
import baseRepository from "./base.repository";

const base = baseRepository<Unit>(dbConfig.getRepository(Unit), "unit_id");
const unitRepository = {
  ...base,
};

export default unitRepository;
