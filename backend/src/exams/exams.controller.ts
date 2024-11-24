import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamGlobal } from 'src/global/exam.global';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get('/')
  async getExams(): Promise<ExamGlobal[]> {
    return await this.examsService.findAll();
  }

  @Get('/:id')
  async getExamById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ExamGlobal> {
    return await this.examsService.findById(id);
  }

  @Post('/add')
  async addExam(@Body() examDto: CreateExamDto): Promise<ExamGlobal> {
    return await this.examsService.create(examDto);
  }

  @Put('/update/:id')
  async updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() examDto: CreateExamDto,
  ): Promise<ExamGlobal> {
    return await this.examsService.update(id, examDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.examsService.delete(id);
  }
}
