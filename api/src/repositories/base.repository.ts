import { Brackets, Repository, SelectQueryBuilder } from "typeorm";
import IBaseRepository from "./base-repository.interface";
import FilterData from "../shared/interfaces/filter-data.interface";
import PaginateData from "../shared/interfaces/paginate-data.interface";

const baseRepository = <T>(
  repository: Repository<T>,
  primaryKey: keyof T
): IBaseRepository<T> => {
  return {
    create: async (data: Partial<T>): Promise<T> => {
      return await repository.save(data as any);
    },

    getAll: async (
      filterData: FilterData<T>,
      extendQuery?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
    ): Promise<PaginateData<T>> => {
      const { page, limit, search, searchColumns, filters, orderBy, orderDir } =
        filterData;
      const queryBuilder = repository.createQueryBuilder("entity");

      if (extendQuery) {
        extendQuery(queryBuilder);
      }

      if (search && searchColumns?.length) {
        queryBuilder.andWhere(
          new Brackets((qb) => {
            searchColumns.forEach((col, idx) => {
              const param = `search${idx}`;
              const colStr = col.toString().includes(".")
                ? col
                : `entity.${col as string}`;
              qb.orWhere(`entity.${colStr as string}::text ILIKE :${param}`, {
                [param]: `%${search}%`,
              });
            });
          })
        );
      }

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            const colStr = key.includes(".") ? key : `entity.${key}`;
            queryBuilder.andWhere(`${colStr} = :${key.replace(/\./g, "_")}`, {
              [key.replace(/\./g, "_")]: value,
            });
          }
        });
      }

      if (orderBy && orderDir) {
        queryBuilder.orderBy(`entity.${orderBy as string}`, orderDir);
      } else {
        queryBuilder.orderBy("entity.created_at", "DESC");
      }

      if (page && limit) {
        queryBuilder.skip((page - 1) * limit).take(limit);
      }

      const [data, totalRecords] = await queryBuilder.getManyAndCount();

      const totalPages = Math.ceil(totalRecords / limit);

      return {
        data,
        page,
        limit,
        totalRecords,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      };
    },

    getOneBy: async (
      condition: Partial<T>,
      extendQuery?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
    ): Promise<T | null> => {
      const queryBuilder = repository.createQueryBuilder("entity");

      if (extendQuery) {
        extendQuery(queryBuilder);
      }

      const where = { ...condition } as any;

      Object.entries(where).forEach(([key, value]) => {
        queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
      });

      return await queryBuilder.getOne();
    },

    update: async (
      id: number | string,
      data: Partial<T>
    ): Promise<T | null> => {
      const existing = await repository.findOne({
        where: { [primaryKey]: id } as any,
      } as any);

      if (!existing) {
        return null;
      }

      return await repository.save({ ...existing, ...data } as any);
    },

    delete: async (id: number | string): Promise<void> => {
      await repository.delete({ [primaryKey]: id } as any);
    },
  };
};

export default baseRepository;
