import { Injectable } from '@nestjs/common';
import { IQuestionRepository } from 'src/interface/IQuestionRepository';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionGlobal } from 'src/global/question.global';

@Injectable()
export class QuestionsReposiotry
  extends BaseRepository<QuestionEntity, Repository<QuestionEntity>>
  implements IQuestionRepository
{
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {
    super(questionRepository);
  }

  getQuestionByQuestionId(questionId: number): Promise<QuestionGlobal> {
    return this.questionRepository.findOneBy({ id: questionId });
  }
}
