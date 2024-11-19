import { Injectable } from '@nestjs/common';
import { CreateUserResultDto } from './dto/create-user_result.dto';
import { UpdateUserResultDto } from './dto/update-user_result.dto';

@Injectable()
export class UserResultsService {
  create(createUserResultDto: CreateUserResultDto) {
    return 'This action adds a new userResult';
  }

  findAll() {
    return `This action returns all userResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userResult`;
  }

  update(id: number, updateUserResultDto: UpdateUserResultDto) {
    return `This action updates a #${id} userResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResult`;
  }
}
