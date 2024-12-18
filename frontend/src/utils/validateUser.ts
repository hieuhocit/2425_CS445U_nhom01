type Parameter = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
  confirm_password: string | null;
};

type ParameterUpdateProfile = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: File | null;
};

type ParameterAddNewUser = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
  permission: string | null;
  image: File | null;
};

type ParameterUpdateUser = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  permission: string | null;
  image: File | null;
};

type Error = {
  field: string;
  message: string;
};

export function validateUser({
  first_name,
  last_name,
  email,
  username,
  password,
  confirm_password,
}: Parameter): Error[] | null {
  const errors: Error[] = [];

  if (!first_name || first_name.trim() === '') {
    errors.push({ field: 'first_name', message: 'Vui lòng điền tên' });
  }
  if (!last_name || last_name.trim() === '') {
    errors.push({ field: 'last_name', message: 'Vui lòng điền họ' });
  }
  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Vui lòng điền email' });
  }
  if (!isEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Vui lòng điền đúng định dạng email',
    });
  }
  if (!username || username.trim() === '') {
    errors.push({ field: 'username', message: 'Vui lòng điền tên đăng nhập' });
  }

  if (!password || password.trim() === '') {
    errors.push({ field: 'password', message: 'Vui lòng điền mật khẩu' });
  }

  if (
    password &&
    !(password.trim().length >= 6 && password.trim()?.length <= 24)
  ) {
    errors.push({
      field: 'password',
      message: 'Mật khẩu phải có từ 6 đến 24 kí tự',
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

  if (password && !passwordRegex.test(password)) {
    errors.push({
      field: 'password',
      message:
        'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt',
    });
  }

  if (!confirm_password || confirm_password.trim() === '') {
    errors.push({
      field: 'confirm_password',
      message: 'Vui lòng điền xác nhận mật khẩu',
    });
  }

  if (
    confirm_password &&
    password &&
    confirm_password.trim() !== password.trim()
  ) {
    errors.push({
      field: 'confirm_password',
      message: 'Mật khẩu xác nhận không khớp',
    });
  }

  if (errors.length > 0) {
    return reduceErrors(errors);
  }

  return null;
}

export function validateUpdateProfile({
  firstName,
  lastName,
  email,
  image,
}: ParameterUpdateProfile): Error[] | null {
  const errors: Error[] = [];

  if (!firstName || firstName.trim() === '') {
    errors.push({ field: 'firstName', message: 'Vui lòng điền tên' });
  }
  if (!lastName || lastName.trim() === '') {
    errors.push({ field: 'last_name', message: 'Vui lòng điền họ' });
  }
  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Vui lòng điền email' });
  }
  if (!isEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Vui lòng điền đúng định dạng email',
    });
  }

  if (image && image.size > 0) {
    if (
      image.type === 'image/jpeg' ||
      image.type === 'image/png' ||
      image.type === 'image/gif'
    ) {
      console.log('');
    } else {
      errors.push({
        field: 'image',
        message: 'Vui lòng chọn các định dạng ảnh như jpeg, png, gif',
      });
    }
  }

  if (errors.length > 0) {
    return reduceErrors(errors);
  }
  return null;
}

export function validateAddNewUser({
  first_name,
  last_name,
  email,
  username,
  password,
  permission,
  image,
}: ParameterAddNewUser): Error[] | null {
  const errors: Error[] = [];

  if (!first_name || first_name.trim() === '') {
    errors.push({ field: 'first_name', message: 'Vui lòng điền tên' });
  }
  if (!last_name || last_name.trim() === '') {
    errors.push({ field: 'last_name', message: 'Vui lòng điền họ' });
  }
  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Vui lòng điền email' });
  }
  if (!isEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Vui lòng điền đúng định dạng email',
    });
  }
  if (!username || username.trim() === '') {
    errors.push({ field: 'username', message: 'Vui lòng điền tên đăng nhập' });
  }

  if (!password || password.trim() === '') {
    errors.push({ field: 'password', message: 'Vui lòng điền mật khẩu' });
  }

  if (
    password &&
    !(password.trim().length >= 6 && password.trim()?.length <= 24)
  ) {
    errors.push({
      field: 'password',
      message: 'Mật khẩu phải có từ 6 đến 24 kí tự',
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

  if (password && !passwordRegex.test(password)) {
    errors.push({
      field: 'password',
      message:
        'Mật khẩu phải bao gồm ít nhất 1 kí tự thường, 1 kí tự hoa, 1 chữ số và 1 kí tự đặc biệt',
    });
  }

  if (!permission || permission.trim() === '') {
    errors.push({ field: 'permission', message: 'Vui lòng chọn vai trò' });
  }

  if (
    permission &&
    permission.trim() !== 'ADMIN' &&
    permission.trim() !== 'MEMBER'
  ) {
    errors.push({ field: 'permission', message: 'Vui lòng chọn đúng vai trò' });
  }

  if (image && image.size > 0) {
    if (
      image.type === 'image/jpeg' ||
      image.type === 'image/png' ||
      image.type === 'image/gif'
    ) {
      console.log('');
    } else {
      errors.push({
        field: 'image',
        message: 'Vui lòng chọn các định dạng ảnh như jpeg, png, gif',
      });
    }
  }

  if (errors.length > 0) {
    return reduceErrors(errors);
  }

  return null;
}

export function validateUpdateUser({
  first_name,
  last_name,
  email,
  permission,
  image,
}: ParameterUpdateUser): Error[] | null {
  const errors: Error[] = [];

  if (!first_name || first_name.trim() === '') {
    errors.push({ field: 'first_name', message: 'Vui lòng điền tên' });
  }
  if (!last_name || last_name.trim() === '') {
    errors.push({ field: 'last_name', message: 'Vui lòng điền họ' });
  }
  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Vui lòng điền email' });
  }
  if (!isEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Vui lòng điền đúng định dạng email',
    });
  }

  if (!permission || permission.trim() === '') {
    errors.push({ field: 'permission', message: 'Vui lòng chọn vai trò' });
  }

  if (
    permission &&
    permission.trim() !== 'ADMIN' &&
    permission.trim() !== 'MEMBER'
  ) {
    errors.push({ field: 'permission', message: 'Vui lòng chọn đúng vai trò' });
  }

  if (image && image.size > 0) {
    if (
      image.type === 'image/jpeg' ||
      image.type === 'image/png' ||
      image.type === 'image/gif'
    ) {
      console.log('');
    } else {
      errors.push({
        field: 'image',
        message: 'Vui lòng chọn các định dạng ảnh như jpeg, png, gif',
      });
    }
  }

  if (errors.length > 0) {
    return reduceErrors(errors);
  }

  return null;
}

function isEmail(email: string | null) {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function reduceErrors(errors: Error[]) {
  const obj = errors.reduce((acc: Record<string, string>, value) => {
    const field = value.field;
    const message = value.message;
    if (acc[field]) return acc;
    acc[field] = message;
    return acc;
  }, {});

  if (obj['password']) {
    delete obj.confirm_password;
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
