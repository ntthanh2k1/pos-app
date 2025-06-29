import { Repository } from "typeorm";
import IBaseRepository from "./base-repository.interface";
import Pagination from "../shared/interfaces/pagination.interface";

const baseRepository = <T>(
  repository: Repository<T>,
  primaryKey: keyof T
): IBaseRepository<T> => ({
  create: async (data: Partial<T>): Promise<T> => {
    return await repository.save(data as any);
  },

  findAll: async (): Promise<T[]> => {
    return await repository.find();
  },

  findById: async (id: number | string): Promise<T | null> => {
    return await repository.findOne({ where: { [primaryKey]: id } } as any);
  },

  findOneBy: async (condition: Partial<T>): Promise<T | null> => {
    return await repository.findOne({ where: condition } as any);
  },

  update: async (id: number | string, data: Partial<T>): Promise<T | null> => {
    await repository.update({ [primaryKey]: id } as any, data as any);
    return await repository.findOne({ where: { [primaryKey]: id } } as any);
  },

  delete: async (id: number | string): Promise<void> => {
    await repository.delete({ [primaryKey]: id } as any);
  },

  softDelete: async (id: number | string): Promise<T | null> => {
    const existing = await repository.findOne({
      where: { [primaryKey]: id },
    } as any);
    if (!existing) return null;
    return await repository.save({ ...(existing as any), is_deleted: true });
  },

  paginate: async (
    page: number,
    limit: number,
    where: Partial<T> = {}
  ): Promise<Pagination<T>> => {
    const [data, total] = await repository.findAndCount({
      where: where as any,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    return {
      data,
      page,
      limit,
      total,
      totalPages,
      hasPrev,
      hasNext,
    };
  },
});

export default baseRepository;
