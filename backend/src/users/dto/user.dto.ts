import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { JoinColumn, OneToOne } from 'typeorm';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  birthday: string;

  @IsString()
  verify_email: string;

  @IsString()
  @OneToOne(() => RoleEntity)
  role_id: string;

  @JoinColumn()
  role: RoleEntity;

  @IsString()
  history_id: string;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
