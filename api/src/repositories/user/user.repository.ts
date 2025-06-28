import { Repository } from "typeorm";
import User from "../../entities/user.entity";
import BaseRepository from "../base/base.repository";
import IUserRepository from "./user-repository.interface";

class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(userRepository: Repository<User>) {
    super(userRepository);
  }

  // Thêm các hàm riêng nếu có
}

export default UserRepository;
