import { Module } from '@nestjs/common';
import { ExamsResultService } from './exams_result.service';
import { ExamsResultController } from './exams_result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsResultEntity } from './entities/exams_result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsResultEntity])],
  controllers: [ExamsResultController],
  providers: [ExamsResultService],
})
export class ExamsResultModule {}
