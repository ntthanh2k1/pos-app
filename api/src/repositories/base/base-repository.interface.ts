import { ObjectLiteral } from "typeorm";

interface IBaseRepository<T extends ObjectLiteral> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOneBy(condition: Partial<T>): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export default IBaseRepository;
