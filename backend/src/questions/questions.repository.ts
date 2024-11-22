import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IQuestionRepository } from 'src/interface/IQuestionRepository';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionGlobal } from 'src/global/question.global';

@Injectable()
export class QuestionsReposiotry implements IQuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>
  ) {}

  async findAll(): Promise<QuestionGlobal[]> {
    // return await this.questionRepository.find()
    return await this.questionRepository.find()
  }

  async findById(id: number) {
    return await this.questionRepository.findOne({ where: { id } })
  }
  
  async create(questionDto: CreateQuestionDto): Promise<QuestionGlobal> {
    return await this.questionRepository.save(questionDto)
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionRepository.update(id, updateQuestionDto)
    return this.findById(id)
  }

  async delete(id: number) {
    const isFlag = await this.questionRepository.delete(id);
    return isFlag.affected === 1;
  }
}
