import { Handler, NextFunction, Request, Response } from "express";
import User from "../../entities/user.entity";
import typeOrmConfig from "../../config/typeorm.config";
import createCode from "../../shared/utils/create-code";
import { hashPassword, verifyPassword } from "../../shared/utils/password";
import { createAccessToken, createRefreshToken } from "../../shared/utils/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../../config/redis.config";

const userRepository = typeOrmConfig.getRepository(User);

const register: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, username, password, confirmPassword } = req.body;

    const existingUser = await userRepository.findOne({ where: { username } });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: `User ${username} already exists.` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }

    const userCode = createCode("USER");
    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.save({
      user_code: userCode,
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        user_id: newUser.user_id,
        user_code: newUser.user_code,
        name: newUser.name,
        username: newUser.username,
      },
    });
  } catch (error) {
    error.methodName = register.name;
    next(error);
  }
};

const login: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { username, password } = req.body;

    const existingUser = await userRepository.findOne({ where: { username } });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: `User ${username} does not exist.` });
    }

    const isPasswordValid = await verifyPassword(
      existingUser.password,
      password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: " Password not valid." });
    }

    const tokenPayload = {
      userId: existingUser.user_id,
      username: existingUser.username,
      jti: crypto.randomUUID(),
    };

    const accessToken = await createAccessToken(tokenPayload, res);
    const refreshToken = await createRefreshToken(tokenPayload, res);

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      data: {
        user_id: existingUser.user_id,
        user_code: existingUser.user_code,
        name: existingUser.name,
        username: existingUser.username,
      },
    });
  } catch (error) {
    error.methodName = login.name;
    next(error);
  }
};

const logout: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req["user"];

    await redis.del(`rt:pos:${user.userId}:${user.jti}`);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      success: true,
      message: "Logout successfully.",
    });
  } catch (error) {
    error.methodName = logout.name;
    next(error);
  }
};

const getAuthUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req["user"];

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    error.methodName = getAuthUser.name;
    next(error);
  }
};

export { register, login, logout, getAuthUser };
