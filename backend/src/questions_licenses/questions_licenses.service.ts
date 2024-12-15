import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { licenses, questions } from 'src/data/data';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { LicenseEntity } from 'src/licenses/entities/license.entity';
import { QuestionsLicenseEntity } from './entities/questions_license.entity';

@Injectable()
export class QuestionsLicensesService {
  constructor(
    @InjectRepository(QuestionsLicenseEntity)
    private questionsLicenseRepository: Repository<QuestionsLicenseEntity>,
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
    @InjectRepository(LicenseEntity)
    private licensesRepository: Repository<LicenseEntity>,
  ) {}

  async insertQL() {
    for (const question of questions) {
      const questionEntity = await this.questionsRepository.save({
        id: question.id,
        image: question.image,
        text: question.text,
        tip: question.tip,
        required: question.required,
        topic_id: question.topic_id,
      });

      for (const licenseId of question.license_ids) {
        const license = await this.licensesRepository.findOne({
          where: { id: licenseId },
        });
        if (license) {
          await this.questionsRepository
            .createQueryBuilder()
            .relation(QuestionEntity, 'licenses')
            .of(questionEntity)
            .add(license);
        }
      }
    }

    for (const license of licenses) {
      await this.licensesRepository.save(license);
    }
  }
}
