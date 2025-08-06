import { Response } from "express";
import jwt from "jsonwebtoken";
import redisConfig from "../../config/redis/redis.config";
import TokenPayload from "../interfaces/token-payload.interface";
import { REDIS_PREFIX } from "./constant";

const createAccessToken = async (tokenPayload: TokenPayload) => {
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

  await redisConfig.setValue(
    `${REDIS_PREFIX}:accessToken:${tokenPayload.username}:${tokenPayload.jti}`,
    accessToken,
    parseInt(process.env.ACCESS_TOKEN_TTL)
  );

  return accessToken;
};

const createRefreshToken = async (tokenPayload: TokenPayload) => {
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
    `${REDIS_PREFIX}:refreshToken:${tokenPayload.username}:${tokenPayload.jti}`,
    refreshToken,
    parseInt(process.env.REFRESH_TOKEN_TTL)
  );

  return refreshToken;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export { createAccessToken, createRefreshToken, verifyToken };
