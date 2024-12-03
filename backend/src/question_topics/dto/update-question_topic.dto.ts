import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionTopicDto } from './create-question_topic.dto';

export class UpdateQuestionTopicDto extends PartialType(
  CreateQuestionTopicDto,
) {}
