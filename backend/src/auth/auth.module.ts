import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AccountEntity } from 'src/accounts/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      useClass: AuthRepository,
      provide: 'IAuthRepository',
    },
  ],
})
export class AuthModule {}
