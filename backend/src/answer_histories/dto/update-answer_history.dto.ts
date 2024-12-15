import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerHistoryDto } from './create-answer_history.dto';

export class UpdateAnswerHistoryDto extends PartialType(
  CreateAnswerHistoryDto,
) {}
