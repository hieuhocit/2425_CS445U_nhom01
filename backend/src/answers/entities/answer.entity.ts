import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  question_id: string;

  @Column()
  is_correct: boolean;

  @Column()
  option: string;

  @Column()
  created_at: Date;

  @Column()
  completed_at: Date;
}
