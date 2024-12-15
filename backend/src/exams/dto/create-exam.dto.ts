import { ArrayNotEmpty, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateExamDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  license_ids: number[];
}
