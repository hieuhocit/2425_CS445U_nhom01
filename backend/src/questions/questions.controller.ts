import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/')
  async getQuestions() {
    return await this.questionsService.findAll();
  }

  // Xem một User theo id trong hệ thống
  @Get('/:id')
  async getQuestionsById(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.findById(id);
  }

  // Tạo một user trong hệ thống
  @Post('/add')
  async createQuestions(@Body() questionDto: CreateQuestionDto) {
    return await this.questionsService.create(questionDto);
  }

  // Cập nhật một User theo id trong hệ thống
  @Put('/update/:id')
  async updateQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    await this.questionsService.update(id, updateQuestionDto);
    return this.getQuestionsById(id);
  }

  // Xóa một User theo id trong hệ thống
  @Delete('/delete/:id')
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.delete(id);
  }
}
