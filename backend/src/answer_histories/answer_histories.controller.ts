import { Controller } from '@nestjs/common';
import { AnswerHistoriesService } from './answer_histories.service';

@Controller('answer-histories')
export class AnswerHistoriesController {
  constructor(
    private readonly answerHistoriesService: AnswerHistoriesService,
  ) {}
}
