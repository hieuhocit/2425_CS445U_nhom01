import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { IAnswerRepository } from 'src/interface/IAnswerRepository';

@Injectable()
export class AnswersService {
  constructor(
    @Inject('IAnswerRepository')
    private readonly answerRepository: IAnswerRepository,
  ) {}

  async findAll() {
    return await this.answerRepository.findAll();
  }

  async findById(id: number) {
    return await this.answerRepository.findById(id);
  }

  async create(createAnswerDto: CreateAnswerDto) {
    return await this.answerRepository.create(createAnswerDto);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    await this.answerRepository.update(id, updateAnswerDto);
    return this.findById(id);
  }

  async delete(id: number) {
    await this.answerRepository.delete(id);
    return { message: 'Answer deleted successfully.' };
  }

  async insert() {
    await this.answerRepository.insertData();
  }
}

