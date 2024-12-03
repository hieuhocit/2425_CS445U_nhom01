import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { AccountEntity } from './entities/account.entity';
import { IAccountRepository } from 'src/interface/IAccountRepository';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity, Repository<AccountEntity>>
  implements IAccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {
    super(accountRepository);
  }
}
