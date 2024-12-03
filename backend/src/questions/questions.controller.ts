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
import { QuestionGlobal } from 'src/global/question.global';

@Controller('question')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/')
  async getQuestions() {
    return await this.questionsService.findAll();
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

  @Get('/all')
  async getAllQuestions(): Promise<QuestionGlobal[]> {
    return await this.questionsService.getAllQuestions();
  }

  @Post('/create/by-topic')
  async create(@Body() createQuestionDto: any): Promise<QuestionGlobal> {
    return this.questionsService.createQuestion(createQuestionDto);
  }
}
