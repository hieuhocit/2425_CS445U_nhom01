import { ExamEntity } from 'src/exams/entities/exam.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from 'typeorm';

@Entity('licenses')
export class LicenseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  code: string;

  @Column({ length: 255 })
  display: string;

  @Column()
  timer: number;

  @Column()
  pass: number;

  @ManyToMany(() => ExamEntity, (exam) => exam.licenses)
  exams: ExamEntity[];

  @ManyToMany(() => QuestionEntity, (question) => question.licenses)
  @JoinTable({
    name: 'questions_licenses',
    joinColumn: { name: 'license_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: 'id' },
  })
  questions: QuestionEntity[];
}
