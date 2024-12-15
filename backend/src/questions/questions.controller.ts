import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Body,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('/api/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/') 
  async getQuestions(
    @Query('licenseId', ParseIntPipe)
    licenseId?: number,
    @Query('topicId', ParseIntPipe) 
    topicId?: number,
  ) {
    return this.questionsService.getQuestions(topicId, licenseId);
  }

  @Get('/:id')
  async getQuestionsById(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.findById(id);
  }

  @Post('/add')
  async createQuestions(@Body() questionDto: CreateQuestionDto) {
    return await this.questionsService.create(questionDto);
  }

  @Put('/update/:id')
  async updateQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    await this.questionsService.update(id, updateQuestionDto);
    return this.getQuestionsById(id);
  }

  @Delete('/delete/:id')
  async deleteQuestion(@Param('id', ParseIntPipe) id: number) {
    return await this.questionsService.delete(id);
  }

  @Post('/insert')
  async addData() {
    await this.questionsService.insertData();
    return { message: 'Question inserted successfully' };
  }
}
