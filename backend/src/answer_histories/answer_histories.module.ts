import { Module } from '@nestjs/common';
import { AnswerHistoriesService } from './answer_histories.service';
import { AnswerHistoriesController } from './answer_histories.controller';

@Module({
  controllers: [AnswerHistoriesController],
  providers: [AnswerHistoriesService],
})
export class AnswerHistoriesModule {}
