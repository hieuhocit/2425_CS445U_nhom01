import { Module } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignsController } from './signs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignEntity } from './entities/sign.entity';
import { SignTopicEntity } from 'src/sign_topics/entities/sign_topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SignEntity, SignTopicEntity])],
  controllers: [SignsController],
  providers: [SignsService],
})
export class SignsModule {}
