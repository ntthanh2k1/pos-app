import { Handler, NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import authService from "./auth.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body;
    const result = await authService.register(dto);

    res.status(201).json(result);
  } catch (error) {
    error.methodName = register.name;
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body;
    const result = await authService.login(dto);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.ACCESS_TOKEN_TTL) * 1000,
    });

    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.REFRESH_TOKEN_TTL) * 1000,
    });

    res.status(200).json(result);
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
    const authUser = req["user"];
    const result = await authService.logout(authUser);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json(result);
  } catch (error) {
    error.methodName = logout.name;
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
    const dto = req.body;
    const result = await authService.refreshToken(refreshToken, dto);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.ACCESS_TOKEN_TTL) * 1000,
    });

    res.status(200).json(result);
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

const getAuthUser: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authUser = req["user"];
    const result = await authService.getAuthUser(authUser);

    res.status(200).json(result);
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
    const result = await authService.changePassword(authUser, req.body);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json(result);
  } catch (error) {
    error.methodName = changePassword.name;
    next(error);
  }
};

const selectBranch: Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const authUser = req["user"];
    const dto = req.body;
    const result = await authService.selectBranch(authUser, dto);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.ACCESS_TOKEN_TTL) * 1000,
    });

    res.status(200).json(result);
  } catch (error) {
    error.methodName = selectBranch.name;
    next(error);
  }
};

export {
  register,
  login,
  refreshToken,
  logout,
  getAuthUser,
  changePassword,
  selectBranch,
};
