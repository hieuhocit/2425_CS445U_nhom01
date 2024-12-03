import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicGlobal } from 'src/global/topic.global';
import { TopicDto } from './dto/topic.dto';

@Controller('topic')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getAllTopic(): Promise<TopicGlobal[]> {
    return await this.topicsService.getAllTopic();
  }

  @Get('/:id')
  async getTopicById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TopicGlobal> {
    return await this.topicsService.getTopicById(id);
  }

  @Post('/add')
  async createTopic(@Body() topicDto: TopicDto): Promise<TopicGlobal> {
    return await this.topicsService.createTopic(topicDto);
  }

  @Put('/update/:id')
  async updateTopic(
    @Body() topicDto: TopicDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TopicGlobal> {
    return await this.topicsService.updateTopic(id, topicDto);
  }

  @Delete('/delete/:id')
  async deleteTopic(@Body() id: number): Promise<boolean> {
    return await this.topicsService.deleteTopic(id);
  }
}
