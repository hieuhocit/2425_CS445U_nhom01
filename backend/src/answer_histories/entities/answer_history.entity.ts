import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('answer_histories')
export class AnswerHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerId: number;

  @Column()
  examHistoryId: number;
}
