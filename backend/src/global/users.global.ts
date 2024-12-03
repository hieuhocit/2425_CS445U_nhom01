export class UserGlobal {
  id?: number;
  username?: string;
  password?: string;
  avatar?: string;
  fullName?: string;
  email?: string;
  phone_number?: string;
  gender?: boolean;
  birthday?: string;
  verify_email?: string;
  permission?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor({
    id,
    username,
    password,
    avatar,
    fullName,
    email,
    phone_number,
    gender,
    birthday,
    verify_email,
    permission,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.avatar = avatar;
    this.fullName = fullName;
    this.email = email;
    this.phone_number = phone_number;
    this.gender = gender;
    this.birthday = birthday;
    this.verify_email = verify_email;
    this.permission = permission;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
