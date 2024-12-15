import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserGlobal } from 'src/global/users.global';
import { UserDto } from './dto/user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserGlobal[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post('/add')
  async create(@Body() userDto: UserDto): Promise<UserGlobal> {
    return await this.usersService.createUsers(userDto);
  }

  @Put('/update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ): Promise<UserGlobal> {
    return await this.usersService.updateUsers(id, userDto);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return (await this.usersService.deleteUsers(id))
      ? `Deleted user with id = ${id} successfully`
      : `Delete User is not available`;
  }
}
