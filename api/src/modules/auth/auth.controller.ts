import { Handler, NextFunction, Request, Response } from "express";
import createCode from "../../shared/utils/create-code";
import { hashPassword, verifyPassword } from "../../shared/utils/password";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../../shared/utils/token";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import userRepository from "../../repositories/user.repository";
import redisConfig from "../../config/redis/redis.config";
import TokenPayload from "../../shared/interfaces/token-payload.interface";

const register: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, username, password, confirmPassword } = req.body;
    const currentUser = await userRepository.getOneBy({ username });

    if (currentUser) {
      return res
        .status(400)
        .json({ success: false, message: `User ${username} already exists.` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password not match.",
      });
    }

    const userCode = createCode("UR");
    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.create({
      code: userCode,
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Register successfully.",
      data: {
        user_id: newUser.user_id,
        user_code: newUser.code,
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
    const currentUser = await userRepository.getOneBy({ username });

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: `User ${username} not exists.` });
    }

    if (!currentUser.is_active) {
      return res
        .status(400)
        .json({ success: false, message: `User ${username} not activates.` });
    }

    const isPasswordValid = await verifyPassword(
      currentUser.password,
      password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password not valid." });
    }

    const tokenPayload: TokenPayload = {
      businessId: currentUser.business_id,
      userId: currentUser.user_id,
      username: currentUser.username,
      jti: crypto.randomUUID(),
    };
    const accessToken = await createAccessToken(tokenPayload, res);
    const refreshToken = await createRefreshToken(tokenPayload, res);

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: {
        userId: currentUser.user_id,
        username: currentUser.username,
      },
    });
  } catch (error) {
    error.methodName = login.name;
    next(error);
  }
};

const refreshToken: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies["refresh_token"];
    const { branchId } = req.body;

    if (!refreshToken) {
      return res
        .status(404)
        .json({ success: false, message: "Refresh token not found." });
    }

    const decoded = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as JwtPayload;

    const redisRefreshToken = await redisConfig.getValue(
      `rt:pos:${decoded.username}:${decoded.jti}`
    );

    if (redisRefreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token not valid." });
    }

    const tokenPayload: TokenPayload = {
      businessId: decoded.business_id,
      branchId,
      userId: decoded.userId,
      username: decoded.username,
      jti: decoded.jti,
    };
    const accessToken = await createAccessToken(tokenPayload, res);

    res.status(200).json({
      success: true,
      message: "Refresh token successfully.",
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: {
        userId: decoded.userId,
        username: decoded.username,
      },
    });
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      res.status(401).json({
        sucess: false,
        message: "Refresh token not valid.",
      });
      return;
    }

    error.methodName = refreshToken.name;
    next(error);
  }
};

const logout: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authUser = req["user"];

    await redisConfig.deleteValue(
      `rt:pos:${authUser.username}:${authUser.jti}`
    );
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
    const authUser = req["user"];

    res.status(200).json({ success: true, data: authUser });
  } catch (error) {
    error.methodName = getAuthUser.name;
    next(error);
  }
};

const changePassword: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authUser = req["user"];
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const currentUser = await userRepository.getOneBy({
      user_id: authUser.userId,
    });

    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isPasswordValid = await verifyPassword(
      currentUser.password,
      currentPassword
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Current password not valid." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password not match.",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await userRepository.update(authUser.userId, {
      password: hashedPassword,
    });

    await redisConfig.deleteKeysByPattern(`rt:pos:${authUser.username}:*`);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res
      .status(200)
      .json({ success: true, message: "Change password successfully." });
  } catch (error) {
    error.methodName = changePassword.name;
    next(error);
  }
};

export { register, login, refreshToken, logout, getAuthUser, changePassword };
