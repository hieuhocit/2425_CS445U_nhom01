import { QuestionGlobal } from 'src/global/question.global';
import { APIRepository } from './APIRepository';

export interface IQuestionRepository extends APIRepository<QuestionGlobal> {
  getAllQuestions(): Promise<QuestionGlobal[]>;
  getQuestionByQuestionId(questionId: any): Promise<QuestionGlobal>;
  createQuestion(questionDto: any): Promise<QuestionGlobal>;
}
