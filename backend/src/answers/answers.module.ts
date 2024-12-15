import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './entities/answer.entity';
import { AnswerReposiotry } from './answers.reposiory';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswersController],
  providers: [
    AnswersService,
    {
      useClass: AnswerReposiotry,
      provide: 'IAnswerRepository',
    },
  ],
})
export class AnswersModule {}
