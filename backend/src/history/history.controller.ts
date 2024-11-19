import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryService } from './history.service';


@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create() {
    return this.historyService.create();
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.historyService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
