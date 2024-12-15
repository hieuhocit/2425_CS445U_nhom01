import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('/api')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get('/answers')
  findAll() {
    console.log('Fetching answers');
    return this.answersService.findAll();
  }

  @Get('/answers/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.findById(id);
  }

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Patch('/answers/:id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @Delete('/answers/:id')
  remove(@Param('id') id: string) {
    return this.answersService.delete(+id);
  }

  @Post('/answers/insert')
  async insert() {
    await this.answersService.insert();
    return { message: 'Data inserted successfully' };
  }
}
