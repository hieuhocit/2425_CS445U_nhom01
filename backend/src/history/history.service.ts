import { Inject, Injectable } from '@nestjs/common';
import { IHistoryRepository } from 'src/interface/IHistoryRepository';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('IHistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  async findAll() {
    return await this.historyRepository.findAll();
  }

  async findOne(id: number) {
    return await this.historyRepository.findById(id);
  }
}
