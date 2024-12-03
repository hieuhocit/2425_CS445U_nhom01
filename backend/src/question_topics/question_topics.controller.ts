import { Controller } from '@nestjs/common';
import { QuestionTopicsService } from './question_topics.service';

@Controller('question-topics')
export class QuestionTopicsController {
  constructor(private readonly questionTopicsService: QuestionTopicsService) {}
}
