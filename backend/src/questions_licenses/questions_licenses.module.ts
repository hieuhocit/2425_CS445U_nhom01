import { Module } from '@nestjs/common';
import { QuestionsLicensesService } from './questions_licenses.service';
import { QuestionsLicensesController } from './questions_licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsLicenseEntity } from './entities/questions_license.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { LicenseEntity } from 'src/licenses/entities/license.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsLicenseEntity, QuestionEntity, LicenseEntity])],
  controllers: [QuestionsLicensesController],
  providers: [QuestionsLicensesService],
})
export class QuestionsLicensesModule {}
