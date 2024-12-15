import { PartialType } from '@nestjs/mapped-types';
import { CreateSignTopicDto } from './create-sign_topic.dto';

export class UpdateSignTopicDto extends PartialType(CreateSignTopicDto) {}
