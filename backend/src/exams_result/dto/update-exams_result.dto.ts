import { PartialType } from '@nestjs/mapped-types';
import { CreateExamsResultDto } from './create-exams_result.dto';

export class UpdateExamsResultDto extends PartialType(CreateExamsResultDto) {}
