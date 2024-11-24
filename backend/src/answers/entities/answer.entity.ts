import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
