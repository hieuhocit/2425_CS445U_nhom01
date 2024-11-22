import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserGlobal } from 'src/global/users.global';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/interface/IUserRepository';



@Injectable()
export class usersRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  // Xem tất cả User trong hệ thống
  async findAll(): Promise<UserGlobal[]> {
    return await this.usersRepository.find()
  }

  // Xem một User theo id trong hệ thống
  async findById(id: number) {
    return await this.usersRepository.findOne( {where: {id}} )
  }

  // Tạo một user trong hệ thống
  async create(userDto: UserDto): Promise<UserGlobal> {
    return await this.usersRepository.save(userDto)
  }

  // Cập nhật một User theo id trong hệ thống
  async update(id: number, updateUsersDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUsersDto)
    return this.findById(id)
  }

  // Xóa một User theo id trong hệ thống
  async delete(id: number): Promise<boolean> {
    const isDelete: DeleteResult = await this.usersRepository.delete(id)
    return isDelete.affected === 1 ? true : false
  }
}

