import { HistoryGlobal } from 'src/global/history.global';
import { APIRepository } from './APIRepository';

export interface IHistoryRepository extends APIRepository<HistoryGlobal> {
  findHistoryByUserId(user_id: number): Promise<HistoryGlobal[]>;
}
