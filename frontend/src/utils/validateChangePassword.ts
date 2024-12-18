type Parameter = {
  old_password: string | null;
  new_password: string | null;
  confirm_new_password: string | null;
};

type Error = {
  field: string;
  message: string;
};

export function validateChangePassword({
  old_password,
  new_password,
  confirm_new_password,
}: Parameter): Error[] | null {
  const errors: Error[] = [];

  if (!old_password || old_password.trim() === '') {
    errors.push({ field: 'old_password', message: 'Vui lòng điền mật khẩu' });
  }

  if (!new_password || new_password.trim() === '') {
    errors.push({
      field: 'new_password',
      message: 'Vui lòng điền mật khẩu mới',
    });
  }

  if (
    new_password &&
    !(new_password.trim().length >= 6 && new_password.trim()?.length <= 24)
  ) {
    errors.push({
      field: 'new_password',
      message: 'Mật khẩu phải có từ 6 đến 24 kí tự',
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

  if (new_password && !passwordRegex.test(new_password)) {
    errors.push({
      field: 'new_password',
      message:
        'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt',
    });
  }
  if (!confirm_new_password || confirm_new_password.trim() === '') {
    errors.push({
      field: 'confirm_new_password',
      message: 'Vui lòng điền xác nhận mật khẩu',
    });
  }

  if (
    new_password &&
    confirm_new_password &&
    new_password.trim() !== confirm_new_password.trim()
  ) {
    errors.push({
      field: 'confirm_new_password',
      message: 'Mật khẩu xác nhận không khớp',
    });
  }

  if (errors.length > 0) {
    return reduceErrors(errors);
  }

  return null;
}

function reduceErrors(errors: Error[]) {
  const obj = errors.reduce((acc: Record<string, string>, value) => {
    const field = value.field;
    const message = value.message;
    if (acc[field]) return acc;
    acc[field] = message;
    return acc;
  }, {});

  if (obj['new_password']) {
    delete obj.confirm_new_password;
  }

  const arr = [];

  for (const key of Object.keys(obj)) {
    arr.push({
      field: key,
      message: obj[key],
    });
  }

  return arr;
}
