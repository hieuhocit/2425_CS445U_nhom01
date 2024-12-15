import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { LawTopicsService } from './law_topics.service';

@Controller('/api/law')
export class LawTopicsController {
  constructor(private readonly lawTopicsService: LawTopicsService) {}
  @Get('/topics')
  async getAllTopic() {
    return await this.lawTopicsService.findAll();
  }

  @Get('/topics/:id')
  async getTopicById(@Param('id', ParseIntPipe) id: number) {
    return await this.lawTopicsService.findById(id);
  }

  @Get('/violations')
  async getViolations(
    @Query('topicId') topicId: number,
    @Query('violationType') violationType: number,
  ) {
    return this.lawTopicsService.findViolations(topicId, violationType);
  }
}
