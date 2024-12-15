import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicGlobal } from 'src/global/topic.global';

@Controller('/api/')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  // @Get('/topics')
  // async getAllTopic(): Promise<TopicGlobal[]> {
  //   return await this.topicsService.getAllTopic();
  // }
  @Get('/topics') 
  async getTopics() {
    return this.topicsService.getAllTopic();
  }

  @Get('/topics/:id')
  async getTopicById(@Param('id', ParseIntPipe) id: number) {
    return await this.topicsService.getTopicById(id);
  }

}
