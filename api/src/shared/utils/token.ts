import { Response } from "express";
import jwt from "jsonwebtoken";
import redisConfig from "../../config/redis/redis.config";
import TokenPayload from "../interfaces/token-payload.interface";

const createAccessToken = async (tokenPayload: TokenPayload, res: Response) => {
  const accessToken = jwt.sign(
    {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
      jti: tokenPayload.jti,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_TTL),
    }
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.ACCESS_TOKEN_TTL) * 1000,
  });

  return accessToken;
};

const createRefreshToken = async (
  tokenPayload: TokenPayload,
  res: Response
) => {
  const refreshToken = jwt.sign(
    {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
      jti: tokenPayload.jti,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_TTL),
    }
  );

  await redisConfig.setValue(
    `rt:pos:${tokenPayload.username}:${tokenPayload.jti}`,
    refreshToken,
    parseInt(process.env.REFRESH_TOKEN_TTL)
  );

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.REFRESH_TOKEN_TTL) * 1000,
  });

  return refreshToken;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export { createAccessToken, createRefreshToken, verifyToken };
