import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { IAnswer } from 'src/data/type';
import { answers } from 'src/data/data';
import { AnswerEntity } from './entities/answer.entity';
import { IAnswerRepository } from 'src/interface/IAnswerRepository';

@Injectable()
export class AnswerReposiotry
  extends BaseRepository<AnswerEntity, Repository<AnswerEntity>>
  implements IAnswerRepository
{
  constructor(
    @InjectRepository(AnswerEntity)
    private examsRepository: Repository<AnswerEntity>,
  ) {
    super(examsRepository);
  }

  async insertData() {
    const answerData: IAnswer[] = answers.map((answers) => ({
      ...answers,
    }));
    await this.examsRepository.save(answerData);
  }
}
