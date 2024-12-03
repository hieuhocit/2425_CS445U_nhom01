import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './accounts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      useClass: AccountRepository,
      provide: 'IAccountRepository',
    },
  ],
})
export class AccountsModule {}
