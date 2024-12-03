import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mistake_question')
export class MistakeQuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  question_id: number;

  @Column()
  mistakes_reason: string;
}
