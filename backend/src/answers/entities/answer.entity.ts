import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('answers')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column()
  correct: boolean;

  @Column()
  question_id: number;
}
