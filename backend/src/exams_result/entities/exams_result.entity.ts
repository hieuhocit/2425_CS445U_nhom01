import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exams_result')
export class ExamsResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exam_id: number;

  @Column()
  user_id: number;

  @Column()
  question_id: number;

  @Column()
  selectd_answer: string;

  @Column()
  is_correct: boolean;

  @Column()
  attempted_at: Date;
}
