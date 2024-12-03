import { Controller } from '@nestjs/common';
import { ExamsResultService } from './exams_result.service';

@Controller('exams-result')
export class ExamsResultController {
  constructor(private readonly examsResultService: ExamsResultService) {}
}
