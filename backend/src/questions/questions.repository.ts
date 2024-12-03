import { Injectable } from '@nestjs/common';
import { IQuestionRepository } from 'src/interface/IQuestionRepository';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionGlobal } from 'src/global/question.global';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsReposiotry
  extends BaseRepository<QuestionEntity, Repository<QuestionEntity>>
  implements IQuestionRepository
{
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {
    super(questionRepository);
  }
  async getAllQuestions(): Promise<QuestionGlobal[]> {
    return await this.questionRepository.find({ relations: ['topic'] });
  }

  getQuestionByQuestionId(questionId: number): Promise<QuestionGlobal> {
    return this.questionRepository.findOneBy({ id: questionId });
  }

  async createQuestion(
    questionDto: CreateQuestionDto,
  ): Promise<QuestionGlobal> {
    const topic = await this.topicRepository.findOne({
      where: { id: questionDto.topic_id },
    });
    console.log(111, topic);
    if (!topic) {
      throw new Error('Topic not found');
    }
    const question = this.questionRepository.create({ ...questionDto, topic });
    console.log(222, question);
    return await this.questionRepository.save(question);
  }
}
