import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IAccountRepository } from 'src/interface/IAccountRepository';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('IAccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.create(createAccountDto);
  }

  findAll() {
    return this.accountRepository.findAll();
  }

  findOne(id: number) {
    return this.accountRepository.findById(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }
}
