import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from './topics.repository';
import { TopicEntity } from './entities/topic.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity, QuestionEntity])],
  controllers: [TopicsController],
  providers: [
    TopicsService,
    {
      useClass: TopicRepository,
      provide: 'ITopicRepository',
    },
  ],
})
export class TopicsModule {}
