import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exams_question')
export class ExamsQuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exam_id: string;

  @Column()
  question_id: number;

  @Column()
  created_at: Date;

  @Column()
  completed_at: Date;
}
