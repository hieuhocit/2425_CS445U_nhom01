import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TopicsService } from './topics.service';

@Controller('/api/')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/topics')
  async getAllTopic() {
    return await this.topicsService.getAllTopic();
  }

  @Get('/topics/:id')
  async getTopicById(@Param('id', ParseIntPipe) id: number) {
    return await this.topicsService.getTopicById(id);
  }
}
