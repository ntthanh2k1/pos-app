import { Request, Response } from "express";
import userRepository from "../../repositories/user.repository";
import createCode from "../../shared/utils/create-code";
import CustomError from "../../shared/utils/custom-error";
import { hashPassword, verifyPassword } from "../../shared/utils/password";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../../shared/utils/token";
import LoginDto from "./dtos/login.dto";
import RegisterDto from "./dtos/register.dto";
import redisConfig from "../../config/redis/redis.config";
import { REDIS_PREFIX } from "../../shared/utils/constant";
import TokenPayload from "../../shared/interfaces/token-payload.interface";
import ChangePasswordDto from "./dtos/change-password.dto";
import branchRepository from "../../repositories/branch.repository";
import branchUserRepository from "../../repositories/branch-user.repository";

const register = async (data: RegisterDto) => {
  const { name, phone, username, password, confirmPassword } = data;
  const currentUser = await userRepository.getOneBy({ username });

  if (currentUser) {
    throw new CustomError(`User ${username} already exists.`, 400);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Password and confirm password not match.", 400);
  }

  const userCode = createCode("UR");
  const hashedPassword = await hashPassword(password);
  const newUser = await userRepository.create({
    code: userCode,
    name,
    phone,
    username,
    password: hashedPassword,
  });

  return {
    message: "Register successfully.",
    user_id: newUser.user_id,
    code: newUser.code,
    name: newUser.name,
    username: newUser.username,
  };
};

const login = async (data: LoginDto) => {
  const { username, password } = data;

  const currentUser = await userRepository.getOneBy({ username });

  if (!currentUser) {
    throw new CustomError(`User ${username} not exists.`, 404);
  }

  if (!currentUser.is_active) {
    throw new CustomError(`User ${username} not activates.`, 400);
  }

  const isPasswordValid = await verifyPassword(currentUser.password, password);

  if (!isPasswordValid) {
    throw new CustomError("Password not valid.", 400);
  }

  const tokenPayload = {
    businessId: currentUser.business_id,
    userId: currentUser.user_id,
    username: currentUser.username,
    jti: crypto.randomUUID(),
  };
  const accessToken = await createAccessToken(tokenPayload);
  const refreshToken = await createRefreshToken(tokenPayload);

  return {
    message: "Login successfully.",
    accessToken: accessToken,
    refreshToken: refreshToken,
    data: tokenPayload,
  };
};

const logout = async (authUser: TokenPayload) => {
  await redisConfig.deleteKeysByPattern(
    `${REDIS_PREFIX}:*:${authUser.username}:${authUser.jti}`
  );

  return {
    message: "Logout successfully.",
  };
};

const refreshToken = async (refreshToken: string, data: any) => {
  const { branchId } = data;

  if (!refreshToken) {
    throw new CustomError("Refresh token not provided.", 401);
  }

  const decoded = verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  ) as TokenPayload;

  const redisRefreshToken = await redisConfig.getValue(
    `${REDIS_PREFIX}:refreshToken:${decoded.username}:${decoded.jti}`
  );

  if (!redisRefreshToken || redisRefreshToken !== refreshToken) {
    throw new CustomError("Refresh token not valid.", 401);
  }

  const redisAccessToken = await redisConfig.getValue(
    `${REDIS_PREFIX}:accessToken:${decoded.username}:${decoded.jti}`
  );

  if (!redisAccessToken) {
    throw new CustomError("Access token revoked.", 401);
  }

  const tokenPayload = {
    businessId: decoded.business_id,
    branchId,
    userId: decoded.userId,
    username: decoded.username,
    jti: decoded.jti,
  };
  const accessToken = await createAccessToken(tokenPayload);

  return {
    message: "Refresh token successfully.",
    accessToken: accessToken,
    refreshToken: refreshToken,
    data: tokenPayload,
  };
};

const getAuthUser = async (authUser: TokenPayload) => {
  return {
    data: authUser,
  };
};

const changePassword = async (
  authUser: TokenPayload,
  data: ChangePasswordDto
) => {
  const { currentPassword, newPassword, confirmPassword } = data;
  const currentUser = await userRepository.getOneBy({
    user_id: authUser.userId,
  });

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  const isPasswordValid = await verifyPassword(
    currentUser.password,
    currentPassword
  );

  if (!isPasswordValid) {
    throw new CustomError("Current password not valid.", 400);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("New password and confirm password not match.", 400);
  }

  const hashedPassword = await hashPassword(newPassword);

  await userRepository.update(authUser.userId, {
    password: hashedPassword,
  });

  await redisConfig.deleteKeysByPattern(
    `${REDIS_PREFIX}:*:${authUser.username}:*`
  );

  return {
    message: "Change password successfully.",
  };
};

const selectBranch = async (authUser: TokenPayload, data: any) => {
  const { branchId } = data;
  const currentBranch = await branchRepository.getOneBy({
    branch_id: branchId,
  });

  if (!currentBranch) {
    throw new CustomError("Branch not found.", 404);
  }

  const isValidBranch = await branchUserRepository.getOneBy({
    branch_id: branchId,
    user_id: authUser.userId,
  });

  if (!isValidBranch) {
    throw new CustomError("Branch not valid.", 400);
  }

  const tokenPayload = {
    ...authUser,
    branchId,
  };
  const accessToken = await createAccessToken(tokenPayload);

  return {
    message: "Select branch successfully.",
    accessToken,
  };
};

const authService = {
  register,
  login,
  logout,
  refreshToken,
  getAuthUser,
  changePassword,
  selectBranch,
};

export default authService;
