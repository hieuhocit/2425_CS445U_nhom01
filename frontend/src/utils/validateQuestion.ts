import { IAnswer } from '@/types/definitions';

type ParameterNewQuestion = {
  image: File | null;
  text: string | null;
  tip?: string | null;
  required?: boolean | null;
  topic_id: number | null;
  answers: IAnswer[];
  exam_ids: number[];
  license_ids: number[];
};

type Error = {
  field: string;
  message: string;
};

export function validateAddNewQuestion({
  text,
  topic_id,
  answers,
  exam_ids,
  license_ids,
  image,
}: ParameterNewQuestion): Error[] | null {
  const errors: Error[] = [];

  if (!text || text.trim() === '') {
    errors.push({ field: 'text', message: 'Vui lòng điền tiêu đề' });
  }

  if (!topic_id) {
    errors.push({ field: 'topic_id', message: 'Vui lòng chọn chủ đề' });
  }

  if (!license_ids || license_ids.length === 0) {
    errors.push({
      field: 'license_ids',
      message: 'Vui lòng chọn ít nhất một giấy phép',
    });
  }

  if (!exam_ids || exam_ids.length === 0) {
    errors.push({
      field: 'exam_ids',
      message: 'Vui lòng chọn ít nhất một đề thi',
    });
  }

  let hasChosenCorrectAnswer = false;

  answers.forEach((value) => {
    if (value.text.trim() === '') {
      errors.push({
        field: 'answer',
        message: 'Vui điền đầy đủ thông tin câu trả lời',
      });
    }
    if (value.correct) {
      hasChosenCorrectAnswer = true;
    }
  });

  if (!hasChosenCorrectAnswer) {
    errors.push({
      field: 'answer',
      message: 'Vui lòng đánh dấu câu trả lời đúng',
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
