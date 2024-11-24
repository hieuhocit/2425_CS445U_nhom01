import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { AnswerEntity } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersRepository } from './answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswersController],
  providers: [
    AnswersService,
    {
      useClass: AnswersRepository,
      provide: 'IAnswersRepository',
    },
  ],
})
export class AnswersModule {}
