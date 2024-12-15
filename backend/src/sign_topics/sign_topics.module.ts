import { Module } from '@nestjs/common';
import { SignTopicsService } from './sign_topics.service';
import { SignTopicsController } from './sign_topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignTopicEntity } from './entities/sign_topic.entity';
import { SignEntity } from 'src/signs/entities/sign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SignTopicEntity, SignEntity])],
  controllers: [SignTopicsController],
  providers: [SignTopicsService],
})
export class SignTopicsModule {}
