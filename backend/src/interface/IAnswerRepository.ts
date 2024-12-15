import { APIRepository } from './RootRepository';
import { AnswerGlobal } from 'src/global/answer.global';

export interface IAnswerRepository extends APIRepository<AnswerGlobal> {
  insertData();
}
