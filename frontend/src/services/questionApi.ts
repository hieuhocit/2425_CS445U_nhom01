import { getApi } from '@/config/fetchApi';
import { IQuestion, ITopic } from '@/types/definitions';

type IParameter = number | string | undefined;

type QuestionResponse =
  | {
      statusCode: string | number;
      message: string;
      data: {
        topic?: ITopic | undefined;
        questions: IQuestion[] | IQuestion;
      } | null;
    }
  | undefined;

export async function getQuestions(
  licenseId?: IParameter,
  topicId?: IParameter,
  examId?: IParameter
): Promise<QuestionResponse> {
  try {
    const url = `questions?${licenseId ? `licenseId=${licenseId}&` : ''}${
      topicId ? `topicId=${topicId}&` : ''
    }${examId ? `examId=${examId}&` : ''}`;

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

export async function getQuestion(
  questionId: number | string
): Promise<QuestionResponse> {
  try {
    const url = `questions/${questionId}`;

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
