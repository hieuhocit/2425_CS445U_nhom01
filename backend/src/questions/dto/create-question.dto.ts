import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  id: number;

  @IsString()
  image: string;

  @IsString()
  content: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
