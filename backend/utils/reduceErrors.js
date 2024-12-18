exports.reduceErrors = (errors) => {
  console.log(errors);
  const obj = errors.reduce((acc, value) => {
    const field = value.path;
    const message = value.msg;
    if (acc[field]) return acc;
    acc[field] = message;
    return acc;
  }, {});

  const arr = [];

  for (const key of Object.keys(obj)) {
    arr.push({
      field: key,
      message: obj[key],
    });
  }
  return arr;
};
