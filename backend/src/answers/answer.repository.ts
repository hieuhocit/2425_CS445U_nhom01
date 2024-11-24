import { BaseRepository } from 'src/interface/BaseRepository';
import { AnswerEntity } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAnswerRepository } from 'src/interface/IAnswerRepository';

export class AnswersRepository
  extends BaseRepository<AnswerEntity, Repository<AnswerEntity>>
  implements IAnswerRepository
{
  constructor(
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
  ) {
    super(answerRepository);
  }
}
