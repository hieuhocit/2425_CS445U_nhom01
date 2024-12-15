import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TopicsModule } from './topics/topics.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { AccountsModule } from './accounts/accounts.module';
import { SignTopicsModule } from './sign_topics/sign_topics.module';
import { AnswerHistoriesModule } from './answer_histories/answer_histories.module';
import { ExamHistoriesModule } from './exam_histories/exam_histories.module';
import { SignsModule } from './signs/signs.module';
import { LicensesModule } from './licenses/licenses.module';
import { AnswersModule } from './answers/answers.module';
import { ViolationsModule } from './violations/violations.module';
import { LawTopicsModule } from './law_topics/law_topics.module';
import { ExamsLicensesModule } from './exams_licenses/exams_licenses.module';
import { QuestionsLicensesModule } from './questions_licenses/questions_licenses.module';
import { QuestionsExamsModule } from './questions_exams/questions_exams.module';

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
    AccountsModule,
    QuestionsModule,
    ExamsModule,
    TopicsModule,
    AuthModule,
    SignTopicsModule,
    AnswerHistoriesModule,
    ExamHistoriesModule,
    SignsModule,
    LicensesModule,
    AnswersModule,
    ViolationsModule,
    LawTopicsModule,
    ExamsLicensesModule,
    QuestionsLicensesModule,
    QuestionsExamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
