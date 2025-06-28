import User from "../../entities/user.entity";
import IBaseRepository from "../base/base-repository.interface";

interface IUserRepository extends IBaseRepository<User> {
  // Thêm các hàm riêng nếu có
}

export default IUserRepository;
