import { getApiWithAuth } from '@/config/fetchApi';

export function getExamHistory(licenseId: string | number) {
  return getApiWithAuth(`user/exam/${licenseId}`);
}

export function getQuestions(examHistoryId: string | number) {
  return getApiWithAuth(`user/question/${examHistoryId}`);
}

export function getWrongAnswers(licenseId: string | number) {
  return getApiWithAuth(`user/answer/${licenseId}`);
}
