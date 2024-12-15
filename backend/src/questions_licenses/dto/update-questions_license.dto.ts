import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionsLicenseDto } from './create-questions_license.dto';

export class UpdateQuestionsLicenseDto extends PartialType(CreateQuestionsLicenseDto) {}
