import { Module } from '@nestjs/common';
import { ExamsQuestionsService } from './exams_questions.service';
import { ExamsQuestionsController } from './exams_questions.controller';
import { ExamsQuestionEntity } from './entities/exams_question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsQuestionEntity])],
  controllers: [ExamsQuestionsController],
  providers: [ExamsQuestionsService],
})
export class ExamsQuestionsModule {}
