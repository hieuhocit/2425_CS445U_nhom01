import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsQuestionsService } from './exams_questions.service';


@Controller('exams-questions')
export class ExamsQuestionsController {
  constructor(private readonly examsQuestionsService: ExamsQuestionsService) {}

  
}
