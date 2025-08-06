import { SelectQueryBuilder } from "typeorm";
import FilterData from "../shared/interfaces/filter-data.interface";
import PaginateData from "../shared/interfaces/paginate-data.interface";

interface IBaseRepository<T> {
  getAll(
    filters: FilterData<T>,
    extendQuery?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
  ): Promise<PaginateData<T>>;
  getOneBy(
    condition: Partial<T>,
    extendQuery?: (qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>
  ): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number | string, data: Partial<T>): Promise<T | null>;
  softDelete(id: number | string): Promise<T | null>;
  delete(id: number | string): Promise<void>;
}

export default IBaseRepository;
