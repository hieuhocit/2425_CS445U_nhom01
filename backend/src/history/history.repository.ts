import { BaseRepository } from 'src/interface/BaseRepository';
import { HistoryEntity } from './entities/history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IHistoryRepository } from 'src/interface/IHistoryRepository';
import { HistoryGlobal } from 'src/global/history.global';

export class HistoryRepository
  extends BaseRepository<HistoryEntity, Repository<HistoryEntity>>
  implements IHistoryRepository
{
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
  ) {
    super(historyRepository);
  }
  findHistoryByUserId(user_id: number): Promise<HistoryGlobal[]> {
    throw new Error(`Method not implemented. ${user_id} is not`);
  }
}
