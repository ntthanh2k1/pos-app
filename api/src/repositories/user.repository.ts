import { dbConfig } from "../config/database/db.config";
import User from "../entities/user.entity";
import baseRepository from "./base.repository";

const base = baseRepository<User>(dbConfig.getRepository(User), "user_id");
const userRepository = {
  ...base,
};

export default userRepository;
