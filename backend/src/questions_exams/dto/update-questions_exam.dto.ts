import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionsExamDto } from './create-questions_exam.dto';

export class UpdateQuestionsExamDto extends PartialType(
  CreateQuestionsExamDto,
) {}
