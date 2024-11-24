import { APIRepository } from './APIRepository';
import { AnswerGlobal } from 'src/global/answer.global';

export interface IAnswerRepository extends APIRepository<AnswerGlobal> {
  findAnswerByQuestionId(questionId: string): Promise<AnswerGlobal[]>;
}
