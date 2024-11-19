import { Module } from '@nestjs/common';
import { ExamsQuestionsService } from './exams_questions.service';
import { ExamsQuestionsController } from './exams_questions.controller';

@Module({
  controllers: [ExamsQuestionsController],
  providers: [ExamsQuestionsService],
})
export class ExamsQuestionsModule {}
