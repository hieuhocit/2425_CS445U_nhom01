import { Injectable } from '@nestjs/common';
import { IQuestionRepository } from 'src/interface/IQuestionRepository';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { IQuestion } from 'src/data/type';
import { questions } from 'src/data/data';
import { LicenseEntity } from 'src/licenses/entities/license.entity';

@Injectable()
export class QuestionsReposiotry
  extends BaseRepository<QuestionEntity, Repository<QuestionEntity>>
  implements IQuestionRepository
{
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
    @InjectRepository(LicenseEntity)
    private licensesRepository: Repository<LicenseEntity>,
  ) {
    super(questionsRepository);
  }
  async getQuestions(topicId?: number, licenseId?: number): Promise<any[]> {
    const query = this.questionsRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.licenses', 'l');
    if (licenseId) {
      query.andWhere('l.id = :licenseId', { licenseId });
    }
    if (topicId !== undefined && topicId !== 1) {
      query.andWhere('q.topic_id = :topicId', { topicId });
    }
    if (topicId === 9) {
      query.andWhere('q.required = true');
    }
    const questions = await query.getMany();
    return questions;
  }

  async insertData() {
    const questionData: IQuestion[] = questions.map((ques) => ({
      ...ques,
    }));
    await this.questionsRepository.save(questionData);
  }
}
