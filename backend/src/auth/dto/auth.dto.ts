import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthPermission {
  id?: number;
  token?: string;
  expiredTime?: number;

  constructor({ id, token, expiredTime }) {
    this.id = id;
    this.token = token;
    this.expiredTime = expiredTime;
  }
}

export class AuthReponseDto {
  id: number;
  username: string;
  password?: string;
  permission: string;

  constructor({ id, username, password, permission }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.permission = permission;
  }
}
