import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { HistoryEntity } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    {
      useClass: HistoryRepository,
      provide: 'IHistoryRepository',
    },
  ],
})
export class HistoryModule {}
