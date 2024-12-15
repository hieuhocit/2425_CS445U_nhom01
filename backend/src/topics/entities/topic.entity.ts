import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('topics')
export class TopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  display: string;
}
