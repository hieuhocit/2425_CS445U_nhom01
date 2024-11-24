import { Inject, Injectable } from '@nestjs/common';
import { IQuestionRepository } from 'src/interface/IQuestionRepository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('IQuestionRepository')
    private questionsRepository: IQuestionRepository,
  ) {}

  async findAll() {
    return await this.questionsRepository.findAll();
  }

  async findById(id: number) {
    return await this.questionsRepository.findById(id);
  }

  async create(questionDto: CreateQuestionDto) {
    return await this.questionsRepository.create(questionDto);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.findById(id);
  }

  async delete(id: number) {
    return await this.questionsRepository.delete(id);
  }
}
