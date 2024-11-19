import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { RolesModule } from './roles/roles.module';
import { UserResultsModule } from './user_results/user_results.module';
import { ExamsQuestionsModule } from './exams_questions/exams_questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from './history/history.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { User } from './users/entities/user.entity';
import { UserResult } from './user_results/entities/user_result.entity';
import { Role } from './roles/entities/role.entity';
import { Question } from './questions/entities/question.entity';
import { History } from './history/entities/history.entity';
import { ExamsQuestion } from './exams_questions/entities/exams_question.entity';
import { Exam } from './exams/entities/exam.entity';
import { Answer } from './answers/entities/answer.entity';

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
        User,
        UserResult,
        Role,
        Question,
        History,
        ExamsQuestion,
        Exam,
        Answer,
      ],
      synchronize: true,
    }),
    UsersModule,
    ExamsModule,
    RolesModule,
    UserResultsModule,
    ExamsQuestionsModule,
    HistoryModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
