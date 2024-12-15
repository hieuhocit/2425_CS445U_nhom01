import { IsNumber, IsString } from 'class-validator';

export class CreateSignDto {
  @IsNumber()
  id: number;

  @IsString()
  signType: string;

  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  image: string;

  @IsNumber()
  sign_topic_id: number;
}
