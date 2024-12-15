import { Module } from '@nestjs/common';
import { LawTopicsService } from './law_topics.service';
import { LawTopicsController } from './law_topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawTopicEntity } from './entities/law_topic.entity';
import { ViolationEntity } from 'src/violations/entities/violation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LawTopicEntity, ViolationEntity])],
  controllers: [LawTopicsController],
  providers: [LawTopicsService],
})
export class LawTopicsModule {}
