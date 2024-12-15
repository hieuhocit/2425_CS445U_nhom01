import { Controller, Post } from '@nestjs/common';
import { QuestionsExamsService } from './questions_exams.service';

@Controller('/api/questions-exams')
export class QuestionsExamsController {
  constructor(private readonly questionsExamsService: QuestionsExamsService) {}

  @Post()
  async insert() {
    return await this.questionsExamsService.insertQE();
  }
}
