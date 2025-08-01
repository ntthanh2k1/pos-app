import { Request, Response } from "express";
import userRepository from "../../repositories/user.repository";
import createCode from "../../shared/utils/create-code";
import CustomError from "../../shared/utils/custom-error";
import { hashPassword, verifyPassword } from "../../shared/utils/password";
import {
  createAccessToken,
  createRefreshToken,
} from "../../shared/utils/token";
import LoginDto from "./dtos/login.dto";
import RegisterDto from "./dtos/register.dto";
import redisConfig from "../../config/redis/redis.config";
import { REDIS_PREFIX } from "../../shared/utils/constant";

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

const login = async (data: LoginDto, res: Response) => {
  const { username, password } = data;

  const currentUser = await userRepository.getOneBy({ username });

  if (!currentUser) {
    throw new CustomError(`User ${username} not exists.`, 400);
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
  const accessToken = await createAccessToken(tokenPayload, res);
  const refreshToken = await createRefreshToken(tokenPayload, res);

  return {
    message: "Login successfully.",
    accessToken: accessToken,
    refreshToken: refreshToken,
    data: tokenPayload,
  };
};

const logout = async (req: Request, res: Response) => {
  const authUser = req["user"];

  await redisConfig.deleteKeysByPattern(
    `${REDIS_PREFIX}:*:${authUser.username}:${authUser.jti}`
  );
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  return {
    message: "Logout successfully.",
  };
};

const authService = { register, login, logout };

export default authService;
