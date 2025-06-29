import Pagination from "../shared/interfaces/pagination.interface";

interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number | string): Promise<T | null>;
  findOneBy(condition: Partial<T>): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number | string, data: Partial<T>): Promise<T | null>;
  delete(id: number | string): Promise<void>;
  softDelete(id: number | string): Promise<T | null>;
  paginate(
    page: number,
    limit: number,
    where?: Partial<T>
  ): Promise<Pagination<T>>;
}

export default IBaseRepository;
