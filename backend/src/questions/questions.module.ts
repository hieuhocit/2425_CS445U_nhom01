import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionEntity } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsReposiotry } from './questions.repository';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { LicenseEntity } from 'src/licenses/entities/license.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, TopicEntity, LicenseEntity]),
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    {
      useClass: QuestionsReposiotry,
      provide: 'IQuestionRepository',
    },
  ],
})
export class QuestionsModule {}
