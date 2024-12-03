import { Controller } from '@nestjs/common';
import { MistakeQuestionsService } from './mistake_questions.service';

@Controller('mistake-questions')
export class MistakeQuestionsController {
  constructor(
    private readonly mistakeQuestionsService: MistakeQuestionsService,
  ) {}
}
