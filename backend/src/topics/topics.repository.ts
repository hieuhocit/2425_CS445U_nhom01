import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { TopicEntity } from './entities/topic.entity';
import { ITopicRepository } from 'src/interface/ITopicRepository';

@Injectable()
export class TopicRepository
  extends BaseRepository<TopicEntity, Repository<TopicEntity>>
  implements ITopicRepository
{
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {
    super(topicRepository);
  }
}
