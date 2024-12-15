import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamsLicenseEntity } from './entities/exams_license.entity';
import { Repository } from 'typeorm';
import { IExam } from 'src/data/type';
import { exams } from 'src/data/data';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Injectable()
export class ExamsLicensesService {
  constructor(
    @InjectRepository(ExamsLicenseEntity)
    private readonly examLicenseRepository: Repository<ExamsLicenseEntity>,
    @InjectRepository(ExamEntity)
    private examsRepository: Repository<ExamEntity>,
  ) {}

  async getAllExamsLicenses() {
    return await this.examLicenseRepository.find();
  }

  async seedExamLicenses() {
    const examLicenses: IExam[] = exams;
    for (const data of examLicenses) {
      const exam = await this.examsRepository.save({
        id: data.id,
        title: data.title,
      });
      for (const licenseId of data.license_ids) {
        await this.examsRepository
          .createQueryBuilder()
          .relation(ExamEntity, 'licenses')
          .of(exam)
          .add(licenseId);
      }
    }
    return { message: 'Data seeded successfully' };
  }
}
