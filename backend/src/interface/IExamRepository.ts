import { APIRepository } from './RootRepository';
import { ExamGlobal } from 'src/global/exam.global';

export interface IExamRepository extends APIRepository<ExamGlobal> {
  insertData();
  addLicenseToExam();
  getExamWithLicenseId(licenseId);
}
