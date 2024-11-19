import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsQuestionsService } from './exams_questions.service';


@Controller('exams-questions')
export class ExamsQuestionsController {
  constructor(private readonly examsQuestionsService: ExamsQuestionsService) {}

  @Post()
  create() {
    return this.examsQuestionsService.create();
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
  update(
    @Param('id') id: string
  ) {
    return this.examsQuestionsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsQuestionsService.remove(+id);
  }
}
