import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsLicensesService } from './questions_licenses.service';


@Controller('/api/questions-licenses')
export class QuestionsLicensesController {
  constructor(private readonly questionsLicensesService: QuestionsLicensesService) {}

  @Post()
  async findAll() {
    await this.questionsLicensesService.insertQL();
    return {message: 'Data inserted successfully'}
  }    
}
