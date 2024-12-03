import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/interface/IUserRepository';
import { BaseRepository } from 'src/interface/BaseRepository';

@Injectable()
export class UsersRepository
  extends BaseRepository<UserEntity, Repository<UserEntity>>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
  async findUserByExam(id: number) {
    const userByExam = await this.usersRepository.findOne({
      where: { id },
      relations: ['exam'],
    });
    console.log(111, userByExam);
    return userByExam;
  }
}
