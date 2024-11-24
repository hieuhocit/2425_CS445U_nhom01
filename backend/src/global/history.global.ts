export class HistoryGlobal {
  id?: string;
  user_id?: number;
  exam_id?: string;
  user_result_id?: number;
  score?: number;
  completed_at?: Date;

  constructor(
    id: string,
    user_id: number,
    user_result_id: number,
    score: number,
    completed_at: Date,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.user_result_id = user_result_id;
    this.score = score;
    this.completed_at = completed_at;
  }
}
