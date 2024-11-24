import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/interface/IUserRepository';
import { BaseRepository } from 'src/interface/BaseRepository';

@Injectable()
export class usersRepository
  extends BaseRepository<UserEntity, Repository<UserEntity>>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
}
