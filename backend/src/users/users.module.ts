import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ExamEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      useClass: UsersRepository,
      provide: 'IUserRepository',
    },
  ],
})
export class UsersModule {}
