import { Controller, Get, Post } from '@nestjs/common';
import { ExamsLicensesService } from './exams_licenses.service';

@Controller('/api/exams-licenses')
export class ExamsLicensesController {
  constructor(private readonly examsLicensesService: ExamsLicensesService) {}

  @Get('')
  async getAllExamsLicenses() {
    return await this.examsLicensesService.getAllExamsLicenses();
  }

  @Post('/insert')
  async seedExamLicenses() {
    return this.examsLicensesService.seedExamLicenses();
  }
}
