import { Inject, Injectable } from '@nestjs/common';
import { UserGlobal } from 'src/global/users.global';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/interface/IUserRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private usersRepository: IUserRepository,
  ) {}

  // Xem tất cả User trong hệ thống
  async getAllUsers() {
    return await this.usersRepository.findAll();
  }

  // Xem một User theo id trong hệ thống
  async getUserById(id: number) {
    return await this.usersRepository.findById(id);
  }

  // Tạo một user trong hệ thống
  async createUsers(userDto: UserDto): Promise<UserGlobal> {
    return await this.usersRepository.create(userDto);
  }

  // Cập nhật một User theo id trong hệ thống
  async updateUsers(id: number, updateUsersDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUsersDto);
    return this.getUserById(id);
  }

  // Xóa một User theo id trong hệ thống
  async deleteUsers(id: number): Promise<boolean> {
    return await this.usersRepository.delete(id);
  }
}
