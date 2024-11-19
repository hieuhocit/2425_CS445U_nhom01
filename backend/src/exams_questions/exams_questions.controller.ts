import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExamsQuestionsService } from './exams_questions.service';
import { CreateExamsQuestionDto } from './dto/create-exams_question.dto';
import { UpdateExamsQuestionDto } from './dto/update-exams_question.dto';

@Controller('exams-questions')
export class ExamsQuestionsController {
  constructor(private readonly examsQuestionsService: ExamsQuestionsService) {}

  @Post()
  create(@Body() createExamsQuestionDto: CreateExamsQuestionDto) {
    return this.examsQuestionsService.create(createExamsQuestionDto);
  }

  @Get()
  findAll() {
    return this.examsQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamsQuestionDto: UpdateExamsQuestionDto) {
    return this.examsQuestionsService.update(+id, updateExamsQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsQuestionsService.remove(+id);
  }
}
