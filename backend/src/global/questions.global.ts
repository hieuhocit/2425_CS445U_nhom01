export class QuestionGlobal {
  id?: number;
  image?: string;
  answer_a?: string;
  answer_b?: string;
  answer_c?: string;
  answer_d?: string;
  correct_answers?: string;
  create_at?: Date;
  update_at?: Date;

  constructor(
    id?: number,
    image?: string,
    answer_a?: string,
    answer_b?: string,
    answer_c?: string,
    answer_d?: string,
    correct_answers?: string,
    create_at?: Date,
    update_at?: Date,
  ) {
    this.id = id;
    this.image = image;
    this.answer_a = answer_a;
    this.answer_b = answer_b;
    this.answer_c = answer_c;
    this.answer_d = answer_d;
    this.correct_answers = correct_answers;
    this.create_at = create_at;
    this.update_at = update_at;
  }
}
