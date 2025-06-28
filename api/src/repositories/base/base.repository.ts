import { ObjectLiteral, Repository } from "typeorm";
import IBaseRepository from "./base-repository.interface";

class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({ where: { id } as any });
  }

  async findOneBy(condition: Partial<T>): Promise<T | null> {
    return await this.repository.findOne({ where: condition as any });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.save({ ...data, id } as any);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.save({ id, is_deleted: true } as any);
  }
}

export default BaseRepository;
