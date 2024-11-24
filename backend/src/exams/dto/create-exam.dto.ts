import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateExamDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  user_id: number;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
