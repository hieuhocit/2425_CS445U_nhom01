import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  avatar: string;

  @IsString()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  birthday: string;

  @IsBoolean()
  gender: boolean;

  @IsString()
  verify_email: string;

  @IsString()
  permission: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
