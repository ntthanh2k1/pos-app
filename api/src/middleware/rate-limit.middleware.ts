import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  headers: true,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  },
});

export default globalLimiter;
