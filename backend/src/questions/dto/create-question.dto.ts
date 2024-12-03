import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  answer_a: string;

  @IsNotEmpty()
  @IsString()
  answer_b: string;

  @IsNotEmpty()
  @IsString()
  answer_c: string;

  @IsNotEmpty()
  @IsString()
  answer_d: string;

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @IsNumber()
  topic_id: number;
}
