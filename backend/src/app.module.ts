import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserResultsModule } from './user_results/user_results.module';
import { RolesModule } from './roles/roles.module';
import { QuestionsModule } from './questions/questions.module';
import { HistoryModule } from './history/history.module';
import { ExamsModule } from './exams/exams.module';
import { ExamsQuestionsModule } from './exams_questions/exams_questions.module';
import { AnswersModule } from './answers/answers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';
import { UserResultEntity } from './user_results/entities/user_result.entity';
import { RoleEntity } from './roles/entities/role.entity';
import { QuestionEntity } from './questions/entities/question.entity';
import { ExamEntity } from './exams/entities/exam.entity';
import { ExamsQuestionEntity } from './exams_questions/entities/exams_question.entity';
import { HistoryEntity } from './history/entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'driving_license_test',
      entities: [
        UserEntity,
        UserResultEntity,
        RoleEntity,
        QuestionEntity,
        ExamEntity,
        ExamsQuestionEntity,
        HistoryEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    UserResultsModule,
    RolesModule,
    QuestionsModule,
    HistoryModule,
    ExamsModule,
    ExamsQuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
