type Parameter = {
  account: string | null;
  password: string | null;
};

type Error = {
  field: string;
  message: string;
};

export function validateLogin({
  account,
  password,
}: Parameter): Error[] | null {
  const errors: Error[] = [];

  if (!account || account.trim() === '') {
    errors.push({
      field: 'account',
      message: 'Vui lòng điền tên người dùng hoặc email',
    });
  }

  if (!password || password.trim() === '') {
    errors.push({ field: 'password', message: 'Vui lòng điền mật khẩu' });
  }

  if (errors.length > 0) return errors;

  return null;
}
