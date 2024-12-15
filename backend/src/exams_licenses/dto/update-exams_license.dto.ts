import { PartialType } from '@nestjs/mapped-types';
import { CreateExamsLicenseDto } from './create-exams_license.dto';

export class UpdateExamsLicenseDto extends PartialType(CreateExamsLicenseDto) {}
