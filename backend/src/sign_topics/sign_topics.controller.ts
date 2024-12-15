import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SignTopicsService } from './sign_topics.service';

@Controller('/api')
export class SignTopicsController {
  constructor(private readonly signTopicsService: SignTopicsService) {}

  @Get('/sign/topics')
  async getAllSignsTopic() {
    return this.signTopicsService.getSignTopics();
  }

  @Get('/sign/topics/:id')
  async getSignsTopicById(@Param('id', ParseIntPipe) id: number) {
    return this.signTopicsService.getSignsTopicById(id);
  }

  @Post('/insert')
  async insert() {
    this.signTopicsService.insert();
    return { message: 'Inserted successfully' }
  }
}
