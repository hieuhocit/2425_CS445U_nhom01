import { APIRepository } from './APIRepository';
import { ExamGlobal } from 'src/global/exam.global';

export interface IExamRepository extends APIRepository<ExamGlobal> {
  findQuestionByExamId(examId: number);
}
