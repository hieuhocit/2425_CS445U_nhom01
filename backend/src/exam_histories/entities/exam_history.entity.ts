import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('exam')
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  licenseIds: string;

  @Column({ length: 255 })
  title: string;
}
