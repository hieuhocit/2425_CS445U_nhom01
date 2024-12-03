import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_results')
export class UserResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  exam_id: number;

  @Column()
  total_questions: number;

  @Column()
  correct_questions: number;

  @Column()
  wrong_questions: number;

  @Column()
  score: number;

  @Column()
  completed_at: Date;
}
