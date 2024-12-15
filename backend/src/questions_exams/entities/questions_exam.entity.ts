import { Entity, PrimaryColumn } from 'typeorm';

@Entity('questions_exams')
export class QuestionsExamEntity {
  @PrimaryColumn()
  question_id: number;

  @PrimaryColumn()
  exam_id: number;
}
