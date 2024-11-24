export class RoleGlobal {
  id?: string;
  role_name?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(
    id?: string,
    role_name?: string,
    created_at?: Date,
    updated_at?: Date,
  ) {
    this.id = id;
    this.role_name = role_name;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
