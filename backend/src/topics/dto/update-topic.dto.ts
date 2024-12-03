import { PartialType } from '@nestjs/mapped-types';
import { TopicDto } from './topic.dto';

export class UpdateTopicDto extends PartialType(TopicDto) {}
