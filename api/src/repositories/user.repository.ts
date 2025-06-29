import dbConfig from "../config/db.config";
import User from "../entities/user.entity";
import baseRepository from "./base.repository";

const base = baseRepository<User>(dbConfig.getRepository(User));
const userRepository = {
  ...base,
};

export default userRepository;
