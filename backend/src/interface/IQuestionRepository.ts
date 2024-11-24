import { QuestionGlobal } from 'src/global/question.global';
import { APIRepository } from './APIRepository';

export interface IQuestionRepository extends APIRepository<QuestionGlobal> {
  getQuestionByQuestionId(questionId: number): Promise<QuestionGlobal>;
}
