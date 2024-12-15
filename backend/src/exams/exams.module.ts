import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ExamEntity } from './entities/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamsReposiotry } from './exams.repository';
import { LicenseEntity } from 'src/licenses/entities/license.entity';
import { ExamsLicenseEntity } from 'src/exams_licenses/entities/exams_license.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity, LicenseEntity, ExamsLicenseEntity]),
  ],
  controllers: [ExamsController],
  providers: [
    ExamsService,
    {
      useClass: ExamsReposiotry,
      provide: 'IExamRepository',
    },
  ],
})
export class ExamsModule {}
