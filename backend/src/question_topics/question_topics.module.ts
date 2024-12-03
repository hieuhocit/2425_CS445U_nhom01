import { Module } from '@nestjs/common';
import { QuestionTopicsService } from './question_topics.service';
import { QuestionTopicsController } from './question_topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionTopicEntity } from './entities/question_topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTopicEntity])],
  controllers: [QuestionTopicsController],
  providers: [QuestionTopicsService],
})
export class QuestionTopicsModule {}
