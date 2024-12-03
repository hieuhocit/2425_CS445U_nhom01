import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from './entities/exam.entity';
import { IExamRepository } from 'src/interface/IExamRepository';

@Injectable()
export class ExamsReposiotry
  extends BaseRepository<ExamEntity, Repository<ExamEntity>>
  implements IExamRepository
{
  constructor(
    @InjectRepository(ExamEntity)
    private examsRepository: Repository<ExamEntity>,
  ) {
    super(examsRepository);
  }
  async findQuestionByExamId(id: number) {
    return this.examsRepository.find({
      where: { id },
      order: { id: 'ASC' },
    });
  }
}
