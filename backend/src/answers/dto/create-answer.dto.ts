import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsBoolean()
  correct: boolean;
}
