import { getApi } from '@/config/fetchApi';

export async function getSignTopics() {
  try {
    const res = await getApi('sign/topics');

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}

export async function getSigns(topicId?: number | string) {
  try {
    const res = await getApi(`sign/signs?topicId=${topicId}`);

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}
