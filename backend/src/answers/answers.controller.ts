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
import { AnswersService } from './answers.service';
import { AnswerGlobal } from 'src/global/answer.global';
import { AnswerDto } from './dto/answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get('/')
  async getAnswers(): Promise<AnswerGlobal[]> {
    return await this.answersService.findAnswerAll();
  }

  @Get('/:id')
  async getAnswerById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AnswerGlobal> {
    return await this.answersService.findAnswerById(id);
  }

  @Post('/add')
  async add(@Body() answersDto: AnswerDto): Promise<AnswerGlobal> {
    return await this.answersService.createAnswer(answersDto);
  }

  @Put('/update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() answersDto: AnswerDto,
  ): Promise<AnswerGlobal> {
    return await this.answersService.updateAnswer(id, answersDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.answersService.deleteAnswer(id);
  }
}
