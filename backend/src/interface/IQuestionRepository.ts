import { QuestionGlobal } from 'src/global/question.global';
import { APIRepository } from './RootRepository';

export interface IQuestionRepository extends APIRepository<QuestionGlobal> {
  insertData();
  getQuestions(topicId?: number, licenseId?: number);
}
