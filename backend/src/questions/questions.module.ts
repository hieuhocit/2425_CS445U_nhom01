import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionEntity } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsReposiotry } from './questions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      useClass: QuestionsReposiotry,
      provide: 'IQuestionRepository',
    },
  ],
})
export class QuestionsModule {}
