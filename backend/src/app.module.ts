import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UserResultsModule } from './user_results/user_results.module';
import { QuestionsModule } from './questions/questions.module';
import { HistoryModule } from './history/history.module';
import { ExamsModule } from './exams/exams.module';
import { ExamsQuestionsModule } from './exams_questions/exams_questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ExamsResultModule } from './exams_result/exams_result.module';
import { TopicsModule } from './topics/topics.module';
import { MistakeQuestionsModule } from './mistake_questions/mistake_questions.module';
import { QuestionTopicsModule } from './question_topics/question_topics.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'driving_license_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 90000 },
    }),
    UsersModule,
    UserResultsModule,
    QuestionsModule,
    HistoryModule,
    ExamsModule,
    ExamsQuestionsModule,
    ExamsResultModule,
    TopicsModule,
    MistakeQuestionsModule,
    QuestionTopicsModule,
    AuthModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
