import { Controller } from '@nestjs/common';
import { ExamHistoriesService } from './exam_histories.service';

@Controller('exam-histories')
export class ExamHistoriesController {
  constructor(private readonly examHistoriesService: ExamHistoriesService) {}
}
