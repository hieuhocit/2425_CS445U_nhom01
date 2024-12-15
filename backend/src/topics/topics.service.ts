import { Inject, Injectable } from '@nestjs/common';
import { ITopicRepository } from 'src/interface/ITopicRepository';
import { TopicGlobal } from 'src/global/topic.global';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('ITopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async getAllTopic(): Promise<TopicGlobal[]> {
    return await this.topicRepository.findAll();
  }

  async getTopicById(id: number): Promise<TopicGlobal> {
    return await this.topicRepository.findById(id);
  }
}
