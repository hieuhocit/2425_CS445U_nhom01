import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from './entities/exam.entity';
import { IExamRepository } from 'src/interface/IExamRepository';
import { IExam } from 'src/data/type';
import { exams } from 'src/data/data';
import { LicenseEntity } from 'src/licenses/entities/license.entity';

@Injectable()
export class ExamsReposiotry
  extends BaseRepository<ExamEntity, Repository<ExamEntity>>
  implements IExamRepository
{
  constructor(
    @InjectRepository(ExamEntity)
    private examsRepository: Repository<ExamEntity>,
    @InjectRepository(LicenseEntity)
    private licensesRepository: Repository<LicenseEntity>,
  ) {
    super(examsRepository);
  }
  async getExamWithLicenseId(licenseId: number) {
    return this.examsRepository
      .createQueryBuilder('exam')
      .innerJoin('exam.licenses', 'license')
      .where('license.id = :licenseId', { licenseId })
      .select(['exam.id AS id', 'exam.title AS title'])
      .getRawMany();
  }

  async insertData() {
    const examData: IExam[] = exams;
    console.log(111, examData);
    const examsToSave = examData.map(({ id, title }) => ({ id, title }));
    console.log(222, examsToSave);
    const a = await this.examsRepository.save(examsToSave);
    console.log(333, a);
  }

  async addLicenseToExam() {
    for (const examData of exams) {
      const exam = await this.examsRepository.save({
        id: examData.id,
        title: examData.title,
      });

      for (const licenseId of examData.license_ids) {
        const license = await this.licensesRepository.findOne({
          where: { id: licenseId },
        });
        if (!license) {
          throw new Error(`License with ID ${licenseId} not found`);
        }

        await this.examsRepository
          .createQueryBuilder()
          .relation(ExamEntity, 'licenses')
          .of(exam)
          .add(license);
      }
      await this.examsRepository.save(exam);
    }
  }

  
}
