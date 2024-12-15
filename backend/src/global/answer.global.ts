export class AnswerGlobal {
  correct?: boolean;
  question_id?: number;
  id?: number;
  text?: string;
  
  constructor(
    correct: boolean,
    question_id: number,
    id: number,
    text: string,
  ) {
    this.correct = correct;
    this.id = id;
    this.question_id = question_id;
    this.text = text;
  }
}
