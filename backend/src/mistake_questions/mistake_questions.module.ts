import { Module } from '@nestjs/common';
import { MistakeQuestionsService } from './mistake_questions.service';
import { MistakeQuestionsController } from './mistake_questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MistakeQuestionEntity } from './entities/mistake_question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MistakeQuestionEntity])],
  controllers: [MistakeQuestionsController],
  providers: [MistakeQuestionsService],
})
export class MistakeQuestionsModule {}
