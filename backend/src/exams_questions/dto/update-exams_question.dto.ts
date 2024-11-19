import { PartialType } from '@nestjs/mapped-types';
import { CreateExamsQuestionDto } from './create-exams_question.dto';

export class UpdateExamsQuestionDto extends PartialType(CreateExamsQuestionDto) {}
