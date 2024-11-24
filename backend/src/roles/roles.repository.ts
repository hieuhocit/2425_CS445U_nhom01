import { BaseRepository } from 'src/interface/BaseRepository';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IRoleRepository } from 'src/interface/IRoleRepository';
import { InjectRepository } from '@nestjs/typeorm';

export class RoleRepository
  extends BaseRepository<RoleEntity, Repository<RoleEntity>>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }
}
