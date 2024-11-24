import { Inject, Injectable } from '@nestjs/common';
import { AnswerDto } from './dto/answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { IAnswerRepository } from 'src/interface/IAnswerRepository';

@Injectable()
export class AnswersService {
  constructor(
    @Inject('IAnswersRepository')
    private answersRepository: IAnswerRepository,
  ) {}

  async findAnswerAll() {
    return await this.answersRepository.findAll();
  }

  async findAnswerById(id: number) {
    return await this.answersRepository.findById(id);
  }

  async createAnswer(answerDto: AnswerDto) {
    return await this.answersRepository.create(answerDto);
  }

  async updateAnswer(id: number, updateAnswerDto: UpdateAnswerDto) {
    await this.answersRepository.update(id, updateAnswerDto);
    return this.findAnswerById(id);
  }

  async deleteAnswer(id: number) {
    return await this.answersRepository.delete(id);
  }
}
