import { IExam } from '@/types/definitions';

export function getRandomExamId(exams: IExam[]) {
  const randomExamIndex = Math.floor(Math.random() * exams.length);
  return exams[randomExamIndex].id;
}
