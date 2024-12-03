import { Inject, Injectable } from '@nestjs/common';
import { ITopicRepository } from 'src/interface/ITopicRepository';
import { TopicDto } from './dto/topic.dto';
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

  async createTopic(topicDto: TopicDto): Promise<TopicGlobal> {
    return await this.topicRepository.create(topicDto);
  }

  async updateTopic(id: number, topicDto: TopicDto) {
    await this.topicRepository.update(id, topicDto);
    return this.getTopicById(id);
  }

  async deleteTopic(id: number): Promise<boolean> {
    return await this.topicRepository.delete(id);
  }
}
