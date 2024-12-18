import { getApi } from '@/config/fetchApi';

export async function getLawTopics() {
  try {
    const res = await getApi('law/topics');

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function getLawTopic(topicId: number | string) {
  try {
    const res = await getApi(`law/topics/${topicId}`);

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function getViolations(
  topicId: string | number,
  violationType: number | string
) {
  try {
    const res = await getApi(
      `law/violations?topicId=${topicId}&violationType=${violationType}`
    );

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function getViolation(violationId: number | string) {
  try {
    const res = await getApi(`law/violations/${violationId}`);

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}
