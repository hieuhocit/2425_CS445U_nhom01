import { Module } from '@nestjs/common';
import { QuestionsExamsService } from './questions_exams.service';
import { QuestionsExamsController } from './questions_exams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsExamEntity } from './entities/questions_exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsExamEntity])],
  controllers: [QuestionsExamsController],
  providers: [QuestionsExamsService],
})
export class QuestionsExamsModule {}
