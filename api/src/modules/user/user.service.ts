import branchUserRepository from "../../repositories/branch-user.repository";
import userRepository from "../../repositories/user.repository";
import TokenPayload from "../../shared/interfaces/token-payload.interface";
import createCode from "../../shared/utils/create-code";
import CustomError from "../../shared/utils/custom-error";
import { hashPassword } from "../../shared/utils/password";
import CreateUserDto from "./dtos/create-user.dto";
import GetUsersDto from "./dtos/get-users.dto";
import UpdateUserDto from "./dtos/update-user.dto";

const createUser = async (
  createUserDto: CreateUserDto,
  authUser: TokenPayload
) => {
  const {
    businessId,
    branchIds,
    name,
    username,
    image,
    phone,
    email,
    identityNumber,
    taxNumber,
    gender,
    birthDate,
    address,
    note,
  } = createUserDto;

  const currentUser = await userRepository.getOneBy({ username });

  if (currentUser) {
    throw new CustomError(`User ${username} already exists.`, 400);
  }

  const code = createCode("UR");
  const hashedPassword = await hashPassword(username);
  const newUser = await userRepository.create({
    business_id: businessId,
    code,
    name,
    username,
    password: hashedPassword,
    image,
    phone,
    email,
    identity_number: identityNumber,
    tax_number: taxNumber,
    gender,
    birth_date: birthDate,
    address,
    note,
    created_by: authUser.userId,
  });

  // create branch_user
  if (branchIds) {
    for (const branchId of branchIds) {
      await branchUserRepository.create({
        branch_id: branchId,
        user_id: newUser.user_id,
        business_id: businessId,
      });
    }
  }

  return {
    message: "Create user successfully.",
    data: newUser,
  };
};

const getUsers = async (getUsersDto: GetUsersDto) => {
  const {
    page,
    limit,
    search,
    searchColumns,
    businessId,
    branchId,
    isActive,
    orderBy,
    orderDir,
  } = getUsersDto;
  const filters: Record<string, any> = {};

  if (businessId) {
    filters.business_id = businessId;
  }

  if (branchId) {
    filters.branch_id = branchId;
  }

  if (typeof isActive === "string") {
    filters.is_active = isActive === "true";
  }

  const filterData: any = {
    page,
    limit,
    search: search ?? null,
    searchColumns:
      Array.isArray(searchColumns) && searchColumns.length > 0
        ? searchColumns
        : null,
    filters: Object.keys(filters).length > 0 ? filters : null,
    orderBy: orderBy ?? null,
    orderDir: orderDir ?? null,
  };

  const users = await userRepository.getAll(filterData);

  return users;
};

const getUser = async (id: string) => {
  const currentUser = await userRepository.getOneBy({ user_id: id });

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  return {
    data: currentUser,
  };
};

const updateUser = async (
  id: string,
  updateUserDto: UpdateUserDto,
  authUser: TokenPayload
) => {
  const {
    name,
    image,
    phone,
    email,
    identityNumber,
    taxNumber,
    gender,
    birthDate,
    address,
    note,
  } = updateUserDto;
  const currentUser = await userRepository.update(id, {
    name,
    image,
    phone,
    email,
    identity_number: identityNumber,
    tax_number: taxNumber,
    gender,
    birth_date: birthDate,
    address,
    note,
    updated_by: authUser.userId,
  });

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  return {
    message: "Update user successfully.",
    data: currentUser,
  };
};

const deleteUser = async (id: string, authUser: TokenPayload) => {
  const currentUser = await userRepository.softDelete(id, authUser.userId);

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  return {
    message: "Delete user successfully.",
  };
};

const userService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
