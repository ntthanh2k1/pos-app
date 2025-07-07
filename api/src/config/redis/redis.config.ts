import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const getValue = async (key: string) => {
  return await redis.get(key);
};

const setValue = async (key: string, value: string, ttl: number) => {
  return await redis.set(key, value, "EX", ttl);
};

const deleteValue = async (key: string) => {
  return await redis.del(key);
};

const deleteKeysByPattern = async (pattern: string) => {
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      "100"
    );
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    cursor = nextCursor;
  } while (cursor !== "0");
};

const redisConfig = {
  getValue,
  setValue,
  deleteValue,
  deleteKeysByPattern,
};

export default redisConfig;
