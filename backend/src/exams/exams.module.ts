import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ExamEntity } from './entities/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsReposiotry } from './exams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamsController],
  providers: [
    ExamsService,
    {
      useClass: ExamsReposiotry,
      provide: 'IExamRepository',
    },
  ],
})
export class ExamsModule {}
