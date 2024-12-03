export class AccountGlobal {
  id?: number;
  username?: string;
  password?: string;
  permission?: string;

  constructor(data: Partial<AccountGlobal>) {
    this.id = data.id || null;
    this.username = data.username || '';
    this.password = data.password || '';
    this.permission = data.permission || '';
  }
}
