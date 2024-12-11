import { getApi } from '@/config/fetchApi';
import { IAnswer } from '@/types/definitions';

type IParameter = number | string | undefined;

type AnswerResponse =
  | {
      statusCode: string | number;
      message: string;
      data: IAnswer[] | IAnswer | null;
    }
  | undefined;

export async function getExams(
  licenseId?: IParameter
): Promise<AnswerResponse> {
  try {
    const url = `exams?${licenseId ? `licenseId=${licenseId}&` : ''}`;

    console.log(url);

    const res = await getApi(url);

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function getExam(
  examId: number | string
): Promise<AnswerResponse> {
  try {
    const url = `exams/${examId}`;

    const res = await getApi(url);

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}
