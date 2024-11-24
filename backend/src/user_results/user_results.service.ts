import { Injectable } from '@nestjs/common';

@Injectable()
export class UserResultsService {
  create() {
    return 'This action adds a new userResult';
  }

  findAll() {
    return `This action returns all userResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userResult`;
  }

  update(id: number) {
    return `This action updates a #${id} userResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResult`;
  }
}
