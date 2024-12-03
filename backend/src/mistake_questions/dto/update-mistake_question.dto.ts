import { PartialType } from '@nestjs/mapped-types';
import { CreateMistakeQuestionDto } from './create-mistake_question.dto';

export class UpdateMistakeQuestionDto extends PartialType(
  CreateMistakeQuestionDto,
) {}
