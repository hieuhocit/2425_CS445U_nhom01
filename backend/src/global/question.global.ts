export class QuestionGlobal {
  id?: number;
  image?: string;
  content?: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(
    id: number,
    image: string,
    content: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.image = image;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
