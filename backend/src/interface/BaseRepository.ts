import { InjectRepository } from '@nestjs/typeorm';
import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<
  T extends BaseEntity,
  R extends Repository<T>,
> {
  constructor(
    @InjectRepository(Repository<T>)
    private readonly repository: R,
  ) {}

  // Get List
  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  // Get Detail
  async findById(id: number): Promise<T> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<BaseEntity>,
    });
  }

  // Add method
  async create(data: T): Promise<T> {
    return this.repository.save(data);
  }

  // Update method
  async update(
    id: number,
    data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : {},
  ): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  // Delete method
  async delete(id: number): Promise<boolean> {
    const isFlag: DeleteResult = await this.repository.delete(id);
    return isFlag.affected === 1;
  }
}
