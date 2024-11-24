import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryGlobal } from 'src/global/history.global';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/')
  async findAll(): Promise<HistoryGlobal[]> {
    return await this.historyService.findAll();
  }

  @Get('/userId=:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<HistoryGlobal> {
    return await this.historyService.findOne(id);
  }
}
