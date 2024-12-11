import { getApi } from '@/config/fetchApi';
import { ITopic } from '@/types/definitions';

type IParameter = number | string | undefined;

type TopicResponse =
  | {
      statusCode: string | number;
      message: string;
      data: ITopic[] | ITopic | null;
    }
  | undefined;

export async function getTopics(
  licenseId?: IParameter
): Promise<TopicResponse> {
  try {
    const url = `topics?${licenseId ? `licenseId=${licenseId}&` : ''}`;

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

export async function getTopic(
  topicId: number | string
): Promise<TopicResponse> {
  try {
    const url = `topics/${topicId}`;

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
