import FilterData from "../shared/interfaces/filter-data.interface";
import PaginateData from "../shared/interfaces/paginate-data.interface";

interface IBaseRepository<T> {
  getAll(filters: FilterData<T>): Promise<PaginateData<T>>;

  getOneBy(condition: Partial<T>): Promise<T | null>;

  create(data: Partial<T>): Promise<T>;

  update(id: number | string, data: Partial<T>): Promise<T | null>;

  softDelete(id: number | string, updatedBy: string): Promise<T | null>;

  delete(id: number | string): Promise<void>;
}

export default IBaseRepository;
