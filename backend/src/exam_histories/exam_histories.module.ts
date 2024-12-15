import { Module } from '@nestjs/common';
import { ExamHistoriesService } from './exam_histories.service';
import { ExamHistoriesController } from './exam_histories.controller';

@Module({
  controllers: [ExamHistoriesController],
  providers: [ExamHistoriesService],
})
export class ExamHistoriesModule {}
