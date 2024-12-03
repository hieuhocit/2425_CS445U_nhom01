import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TopicDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  topic_name: string;
}
