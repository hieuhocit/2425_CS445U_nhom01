import { fetchApi } from '@/config/fetchApi';

export async function getLawTopics() {
  try {
    const res = await fetchApi('law/topics');

    if (!res.ok) {
      throw Error('Đã xảy ra lỗi');
    }

    const resData = await res.json();

    return resData;
  } catch (error) {
    console.error(error);
  }
}
