import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

const validateDto = (
  dto: any,
  source: "body" | "query" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];

      if (data === null || typeof data !== "object") {
        res.status(400).json({
          message: "Request data format not valid.",
        });
        return;
      }

      const dtoInstance = plainToInstance(dto, data);
      const errors = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        res.status(400).json({
          message: "Fail to validate request data.",
          errors: errors.map((e) => ({
            field: e.property,
            messages: Object.values(e.constraints || {}),
          })),
        });
        return;
      }

      Object.assign(req[source], dtoInstance);

      next();
    } catch (error) {
      error.methodName = validateDto.name;
      next(error);
    }
  };
};

export default validateDto;
