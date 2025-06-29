import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

const validateDto = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(dto, req.body);
      const errors = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: errors.map((e) => ({
            field: e.property,
            messages: Object.values(e.constraints || {}),
          })),
        });
        return;
      }

      req.body = dtoInstance;
      next();
    } catch (error) {
      error.methodName = validateDto.name;
      next(error);
    }
  };
};

export default validateDto;
