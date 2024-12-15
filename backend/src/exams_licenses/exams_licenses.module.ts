import { Module } from '@nestjs/common';
import { ExamsLicensesService } from './exams_licenses.service';
import { ExamsLicensesController } from './exams_licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsLicenseEntity } from './entities/exams_license.entity';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamsLicenseEntity, ExamEntity])],
  controllers: [ExamsLicensesController],
  providers: [ExamsLicensesService],
})
export class ExamsLicensesModule {}
