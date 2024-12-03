import { Inject, Injectable } from '@nestjs/common';
import { IExamRepository } from 'src/interface/IExamRepository';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @Inject('IExamRepository')
    private examRepository: IExamRepository,
  ) {}

  async findAll() {
    return await this.examRepository.findAll();
  }

  async findById(id: number) {
    return await this.examRepository.findById(id);
  }

  async findQuestionByExamId(id: number) {
    return await this.examRepository.findQuestionByExamId(id);
  }


  async create(createExamDto: CreateExamDto) {
    return await this.examRepository.create(createExamDto);
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    await this.examRepository.update(id, updateExamDto);
    return this.findById(id);
  }

  async delete(id: number) {
    return await this.examRepository.delete(id);
  }

  async findUserByExamId(id: number) {
    return await this.examRepository.findQuestionByExamId(id);
  }
}
