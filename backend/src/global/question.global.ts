export class QuestionGlobal {
  id?: number;
  image?: string;
  content?: string;
  answer_a?: string;
  answer_b?: string;
  answer_c?: string;
  answer_d?: string;
  correct_answer?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor({
    id,
    image,
    content,
    answer_a,
    answer_b,
    answer_c,
    answer_d,
    correct_answer,
    created_at,
    updated_at,
  }) {
    if (id !== undefined) this.id = id;
    if (image !== undefined) this.image = image;
    if (content !== undefined) this.content = content;
    if (answer_a !== undefined) this.answer_a = answer_a;
    if (answer_b !== undefined) this.answer_b = answer_b;
    if (answer_c !== undefined) this.answer_c = answer_c;
    if (answer_d !== undefined) this.answer_d = answer_d;
    if (correct_answer !== undefined) this.correct_answer = correct_answer;
    if (created_at !== undefined) this.created_at = created_at;
    if (updated_at !== undefined) this.updated_at = updated_at;
  }
}
